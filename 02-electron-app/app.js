import NodeWebcam from "node-webcam";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
export const appPort = 32768;

const webcamOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false,
};

const webcam = NodeWebcam.create(webcamOptions);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/capture", (req, res) => {
  const imgPath = path.resolve(__dirname, "public/capture.jpg");

  NodeWebcam.capture(imgPath, webcamOptions, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error capturing image");
    }
    res.sendFile(imgPath);
  });
});


const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
app.get("/monitors", (req, res) => {
  exec(`${ffmpegPath} -list_devices true -f dshow -i dummy`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error listing monitors");
    }

    const devices = [];
    const lines = stderr.split('\n');
    let captureNextLine = false;

    for (const line of lines) {
      if (line.includes('DirectShow video devices')) {
        captureNextLine = true;
        continue;
      }

      if (captureNextLine) {
        if (line.includes(']  "')) {
          const device = line.split(']  "')[1].replace('"', '');
          devices.push(device);
        }
      }
    }

    res.json({ monitors: devices });
  });
});

// Stream monitor
app.get("/stream/:id", (req, res) => {
  const monitorId = req.params.id;
  const streamUrl = `http://${req.hostname}:${appPort}/stream/${monitorId}.m3u8`;

  const command = `ffmpeg -f dshow -i video="${monitorId}" -vf "scale=1280:720" -f hls -hls_time 2 -hls_list_size 5 -hls_flags delete_segments -hls_segment_filename public/stream/segment_%03d.ts public/stream/${monitorId}.m3u8`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error starting stream");
    }
    res.json({ streamUrl });
  });
});

app.listen(appPort, () => {
  console.log(`App listening at http://localhost:${appPort}`);
});

export const myExpress = {};
myExpress.start = () => {};
