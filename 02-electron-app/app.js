import NodeWebcam from "node-webcam";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
// Enable CORS for all origins

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
const port = 32768;

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

// Define a route for the root URL (/)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a route to capture an image
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export const myExpress = {};
myExpress.start = () => {};
