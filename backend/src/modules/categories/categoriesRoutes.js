import { Router } from "express";
import authMiddleware from "#middlewares/authMiddleware.js";
import categoriesController from "./categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.use(authMiddleware);

categoriesRouter.get("/", categoriesController.getCategories);

export default categoriesRouter;
