import express, { Request, Response } from "express";

const app = express();

app.get("/api", (req: Request, res: Response) => {
  res.send(`Hello from Express API! Environment: ${process.env.NODE_ENV}`);
});

app.get("/", (req: Request, res: Response)=> {
  res.status(200).send({ hello: "world" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});