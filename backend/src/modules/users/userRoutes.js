import { Router } from "express";
import authMiddleware from "#middlewares/authMiddleware.js";
import userController from "./userController.js";

const usersRouter = Router();

usersRouter.use(authMiddleware);

usersRouter.get("/", userController.getUsers);

export default usersRouter;
