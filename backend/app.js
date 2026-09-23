import "#modules/tasks/events/listeners/taskListener.js";

// Express
import express from "express";

// Routers
import tasksRouter from "#modules/tasks/taskRoutes.js";
import authRouter from "#modules/auth/authRoutes.js";
import usersRouter from "#modules/users/userRoutes.js";
import categoriesRouter from "#modules/categories/categoriesRoutes.js";

// Middleware
import cors from "cors";

const app = express();

// Configuración de middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/saas-api/v1/auth", authRouter);
app.use("/saas-api/v1/tasks", tasksRouter);
app.use("/saas-api/v1/users", usersRouter);
app.use("/saas-api/v1/categories", categoriesRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  const status = err.statusCode || 500; // 500 si no se especifica
  res.status(status).json({
    status,
    message: err.message || "Error interno del servidor",
  });
});

export default app;
