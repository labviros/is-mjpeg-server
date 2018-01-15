const amqp = require('amqplib/callback_api');
const Rx = require('rxjs');
const http = require('http');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');
const express = require('express');

const image = require('./schemas/image_pb');
const camera = require('./schemas/camera_pb');
const common = require('./schemas/common_pb');

const broker_uri = _.defaultTo(process.env.IS_URI, 'amqp://rmq.is:30000');
const exchange = 'is';
const queue = `camera-viewer-server/${uuidv1()}`
const port = _.defaultTo(process.env.IS_PORT, 3000);

amqp.connect(broker_uri, (err, connection) => {
  connection.createChannel((err, channel) => {
    channel.assertQueue(queue, { durable: false, autoDelete: true });

    const msgs = Rx.Observable.create((observer) => {
      channel.consume(queue, (msg) => {
        observer.next(msg)
      }, { noAck: true });
    });

    let subscriptions = {} // ref count for subscriptions

    const configureCamera = (id, fps, color) => {
      let samplingSettings = new common.SamplingSettings();
      samplingSettings.setFrequency(fps);
      
      let imageSettings = new image.ImageSettings();
      let colorSpace = new image.ColorSpace();
      colorSpace.setValue(image.ColorSpaces[color]);
      imageSettings.setColorSpace(colorSpace);
      
      let config = new camera.CameraConfig();
      config.setSampling(samplingSettings);
      config.setImage(imageSettings);
      channel.publish(exchange, `CameraGateway.${id}.SetConfig`, new Buffer(config.serializeBinary()));
    };
    
    const server = express();
    server.get('/:id?', (req, res) => {
      let id = _.defaultTo(req.params.id, 0);
      let fps = _.defaultTo(req.query.fps, 10);
      let color = _.defaultTo(req.query.color, 'gray').toUpperCase();
      configureCamera(id, fps, color);

      let topic = `CameraGateway.${id}.Frame`;
      channel.bindQueue(queue, exchange, topic);
      subscriptions[topic] = typeof (subscriptions[topic]) == 'undefined' ? 1 : subscriptions[topic] + 1;

      res.writeHead(200, {
        'Content-Type': 'multipart/x-mixed-replace; boundary=--myboundary',
        'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
        'Pragma': 'no-cache',
        'Connection': 'close'
      });

      let stream = msgs.filter(msg => msg.fields.routingKey == topic)
        .subscribe((msg) => {
          let jpg = image.Image.deserializeBinary(new Uint8Array(msg.content)).getData();
          res.write(`--myboundary\nContent-Type: image/jpg\nContent-length: ${jpg.length}\n\n`);
          res.write(new Buffer(jpg));
        });

      req.on('close', () => {
        stream.unsubscribe()
        subscriptions[topic] -= 1;
        if (subscriptions[topic] == 0) { channel.unbindQueue(queue, exchange, topic); }
      });
    });

    server.listen(port);
  });
});
