import NodeWebcam from "node-webcam";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import screen from "screenshot-desktop";
import sharp from 'sharp'; // For image processing

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

// Endpoint to stream screen capture
app.get('/stream', async (req, res) => {
  try {
    const imgBuffer = await screen({
      format: 'jpeg', // Capture in JPEG format
      quality: 100,   // Highest quality (0-100)
    });

    // Compress the image using sharp
    const compressedImgBuffer = await sharp(imgBuffer)
      .jpeg({ quality: 30 }) // Adjust JPEG quality (0-100)
      .toBuffer();

    // Set headers for streaming response
    res.set('Content-Type', 'image/jpeg'); // Set content type to JPEG
    res.set('Cache-Control', 'no-cache');
    res.set('Connection', 'keep-alive');

    // Send the compressed screen image as the response
    res.send(compressedImgBuffer);
  } catch (err) {
    console.error('Error capturing screen:', err);
    res.status(500).send('Error capturing screen');
  }
});

app.listen(appPort, () => {
  console.log(`App listening at http://localhost:${appPort}`);
});

export const myExpress = {};
myExpress.start = () => {};
