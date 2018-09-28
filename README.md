is-mjpeg-server
==================

Implementation of a [MJPEG](https://en.wikipedia.org/wiki/Motion_JPEG) webserver for **is** cameras in nodejs to show how to build nodejs applications for the **is** architecture.

```shell
$ npm install . # install dependencies
$ export IS_URI="amqp:includeIP and Port"  # export the value for IS_URI
$ node server.js # run the server
$ xdg-open 'http://localhost:3000/0?fps=10&color=gray' # open in browser
```
