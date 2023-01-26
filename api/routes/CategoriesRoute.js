import express from "express";
import { getAllCat, newCategory } from "../controller/CategoryController";

const catRouter = express.Router();

catRouter.post("/", newCategory);
catRouter.get("/", getAllCat);

export default catRouter;
