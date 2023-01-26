import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/Auth";
import postRouter from "./routes/PostRoute";
import catRouter from "./routes/CategoriesRoute";
import multer from "multer";

const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MONGODB"))
  .catch((error) => console.log(error));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File uploaded successfully! ");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", catRouter);
// app.use("/api/users", authRouter);

app.listen(5000, () => {
  console.log("backend is runnning ");
});
