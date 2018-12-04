is-mjpeg-server
==================

Implementation of a [MJPEG](https://en.wikipedia.org/wiki/Motion_JPEG) webserver for **is** cameras in nodejs to show how to build nodejs applications for the **is** architecture.

```shell
$ npm install . # install dependencies
$ export IS_URI="amqp:includeIP and Port"  # export the value for IS_URI
$ node server.js # run the server
$ xdg-open 'http://localhost:3000/0?fps=10&color=gray' # open in browser
```

Recording a video
---

You can easily record a video from a camera using the utility [ffmpeg](https://www.ffmpeg.org/). If you are using Ubuntu, install it running:

```shell
$ sudo apt-get install -y ffmpeg
```

To make a video with 10 seconds of duration, execute the command that the *STREAMING_URI* is the same as used in browser:

```shell
$ ffmpeg  -use_wallclock_as_timestamps 1 -f mjpeg -i "STREAMING_URI" -t 10 -c copy -y output.mp4
```

Otherwise, if you want record until a key press event, run the command below and then press **q** to exit.

```shell
$ ffmpeg  -use_wallclock_as_timestamps 1 -f mjpeg -i "STREAMING_URI" -c copy -y output.mp4
```
