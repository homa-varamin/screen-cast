import NodeWebcam from "node-webcam";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import fs from "fs";
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
export const appPort = 3000; /* 32768 */

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

app.get('/stream', (req, res) => {
  const filePath = path.resolve('output.mp4');
  res.sendFile(filePath);
});


/* app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'video/x-flv');

  http.get('http://localhost:8081/feed1.ffm', (streamRes) => {
    // Check if the request was successful
    if (streamRes.statusCode !== 200) {
      res.sendStatus(streamRes.statusCode);
      return;
    }
    // Pipe the stream response to the client
    streamRes.pipe(res);
  }).on('error', (err) => {
    console.error('Error fetching stream:', err);
    res.sendStatus(500);
  });
}); */

/* app.get("/stream", async (req, res) => {
  try {
    const imgBuffer = await screen({
      format: "jpeg",
      quality: 100,
    });

    const compressedImgBuffer = await sharp(imgBuffer).jpeg({ quality: 30 }).toBuffer();

    res.set("Content-Type", "image/jpeg");
    res.set("Cache-Control", "no-cache");
    res.set("Connection", "keep-alive");

    res.send(compressedImgBuffer);
  } catch (err) {
    console.error("Error capturing screen:", err);
    res.status(500).send("Error capturing screen");
  }
}); */

app.listen(appPort, () => {
  console.log(`App listening at http://localhost:${appPort}`);
});

export const myExpress = {};
myExpress.start = () => {};
