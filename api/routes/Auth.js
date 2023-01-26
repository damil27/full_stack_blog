import express from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
} from "../controller/UserController";

// register
const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.put("/:id", updateUser);
authRouter.delete("/:id", deleteUser);
authRouter.get("/:id", getUser);

export default authRouter;
