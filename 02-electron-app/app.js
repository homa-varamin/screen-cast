import NodeMediaServer from 'node-media-server';
import express from 'express';
import path from 'path';

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 18000,
    allow_origin: '*'
  }
};

const nms = new NodeMediaServer(config);
nms.run();


const app = express();
const __dirname = path.resolve();

app.use('/hls', express.static(path.join(__dirname, 'output')));

app.listen(8080, () => {
  console.log('HTTP server running on port 8080');
});

/*
ffmpeg -f gdigrab -framerate 30 -i desktop -c:v libx264 -preset ultrafast -f flv rtmp://localhost:1935/live/stream
and then
mkdir -p /path/to/output
ffmpeg -i rtmp://localhost:1935/live/stream -c:v libx264 -crf 23 -preset veryfast -c:a aac -strict -2 -f hls -hls_time 2 -hls_list_size 3 /path/to/output/output.m3u8

*/