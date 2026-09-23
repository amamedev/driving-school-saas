import Router from "express";
import authController from "./authController.js";
import validateLogin from "./middlewares/validateLogin.js";
import authMiddleware from "#middlewares/authMiddleware.js";
import { loginSchema } from "#schemas/loginSchema.js";
const authRouter = Router();

// Rutas de autenticación
authRouter.get("/me", authMiddleware, authController.getMe);
authRouter.post("/login", validateLogin(loginSchema), authController.login);

export default authRouter;
