import express from "express";
import {
  deletePost,
  getAllPost,
  getPost,
  newPost,
  updatePost,
} from "../controller/PostController";

const postRouter = express.Router();

postRouter.post("/", newPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.get("/:id", getPost);
postRouter.get("/", getAllPost);

export default postRouter;
