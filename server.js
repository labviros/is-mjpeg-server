const amqp = require('amqplib/callback_api');
const Rx = require('rxjs');
const http = require('http');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');
const express = require('express');

const wrappers = require('google-protobuf/google/protobuf/wrappers_pb.js');
const image = require('./is/msgs/image_pb');
const camera = require('./is/msgs/camera_pb');
const common = require('./is/msgs/common_pb');

const broker_uri = _.defaultTo(process.env.IS_URI, 'amqp://localhost');
const exchange = 'is';
const queue = `camera-viewer-server/${uuidv1()}`
const port = _.defaultTo(process.env.IS_PORT, 3000);

amqp.connect(broker_uri, (err, connection) => {
  connection.createChannel((err, channel) => {
    channel.assertQueue(queue, { durable: false, autoDelete: true });
    channel.bindQueue(queue, exchange, queue);

    const msgs = Rx.Observable.create((observer) => {
      channel.consume(queue, (msg) => {
        observer.next(msg)
      }, { noAck: true });
    })
      .publish()
      .refCount();

    let subscriptions = {} // ref count for subscriptions

    const configureCamera = (id, query) => {
      let config = new camera.CameraConfig();
      let has_fps = _.has(query, 'fps')
      let has_color = _.has(query, 'color')

      if (has_fps) {
        let samplingSettings = new common.SamplingSettings();
        let wrapper = new wrappers.FloatValue()
        wrapper.setValue(query.fps)
        samplingSettings.setFrequency(wrapper);
        config.setSampling(samplingSettings);
      }

      if (has_color) {
        let imageSettings = new image.ImageSettings();
        let colorSpace = new image.ColorSpace();
        colorSpace.setValue(image.ColorSpaces[query.color.toUpperCase()]);
        imageSettings.setColorSpace(colorSpace);
        config.setImage(imageSettings);
      }

      if (has_fps || has_color) {
        console.log(`[>][${new Date()}][${id}]`, config.toObject());
        channel.publish(exchange, `CameraGateway.${id}.SetConfig`, new Buffer(config.serializeBinary()), {
          replyTo: queue
        });
      }

      console.log(`[+][${new Date()}][${id}]`)
    };

    const server = express();

    server.get('/:id?', (req, res) => {
      let id = _.defaultTo(req.params.id, 0);

      let isGatewayId = !_.isNaN(parseInt(id));
      let topic = isGatewayId ? `CameraGateway.${id}.Frame` : id;
      if (isGatewayId) {
        configureCamera(id, req.query);
      }

      subscriptions[topic] = _.has(subscriptions, topic) ? subscriptions[topic] + 1 : 1;
      if (subscriptions[topic] == 1) {
        channel.bindQueue(queue, exchange, topic);
      }

      res.writeHead(200, {
        'Content-Type': 'multipart/x-mixed-replace; boundary=--myboundary',
        'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
        'Pragma': 'no-cache',
        'Connection': 'close'
      });

      let stream = msgs.filter(msg => msg.fields.routingKey == topic)
        .throttle(ev => Rx.Observable.interval(1000 / 15))
        .subscribe((msg) => {
          let data = image.Image.deserializeBinary(new Uint8Array(msg.content)).getData();
          res.write(`--myboundary\nContent-Type: image/jpg\nContent-length: ${data.length}\n\n`);
          res.write(new Buffer(data))
        });

      req.on('close', () => {
        console.log(`[-][${new Date()}][${id}]`);
        stream.unsubscribe()
        subscriptions[topic] -= 1;
        if (subscriptions[topic] == 0) { channel.unbindQueue(queue, exchange, topic); }
      });
    });

    server.listen(port);
  });
});
