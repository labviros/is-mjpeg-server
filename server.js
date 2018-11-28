const amqp = require('amqplib/callback_api');
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

    let subscriptions = {} // ref count for subscriptions

    channel.consume(queue, (msg) => {
      _.forEach(subscriptions[msg.fields.routingKey], (s) => {
        let data = image.Image.deserializeBinary(new Uint8Array(msg.content)).getData();
        s.response.write(`--myboundary\nContent-Type: image/jpg\nContent-length: ${data.length}\n\n`);
        s.response.write(new Buffer(data))
      })
    }, { noAck: true });

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
    };

    const server = express();

    server.get('/:id?', (request, response) => {
      let id = _.defaultTo(request.params.id, 0);

      let isGatewayId = !_.isNaN(parseInt(id));
      let topic = isGatewayId ? `CameraGateway.${id}.Frame` : id;
      if (isGatewayId) {
        configureCamera(id, request.query);
      }

      console.log(`[${new Date()}] ev=NewClient id=${id}`);

      const newSubscription = !_.has(subscriptions, topic);
      if (newSubscription) {
        console.log(`[${new Date()}] ev=NewSub topic=${topic}`);
        subscriptions[topic] = [];
        channel.bindQueue(queue, exchange, topic);
      }

      const requestId = uuidv1();
      subscriptions[topic].push({ requestId, response });

      response.writeHead(200, {
        'Content-Type': 'multipart/x-mixed-replace; boundary=--myboundary',
        'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
        'Pragma': 'no-cache',
        'Connection': 'close'
      });

      request.on('close', () => {
        _.remove(subscriptions[topic], (s) => s.requestId == requestId);

        console.log(`[${new Date()}] ev=DelClient id=${id}`);
        if (subscriptions[topic].length == 0) {
          console.log(`[${new Date()}] ev=DelSub topic=${topic}`);
          channel.unbindQueue(queue, exchange, topic);
          delete subscriptions[topic];
        }
      });
    });

    server.listen(port);
  });
});
