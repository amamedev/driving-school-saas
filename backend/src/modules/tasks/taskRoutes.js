import Router from "express";
import taskController from "./taskController.js";
import upload from "#middlewares/uploadMiddleware.js";
import validateBody from "#modules/tasks/middlewares/validateBody.js";
import validateQuery from "#modules/tasks/middlewares/validateQuery.js";
import authMiddleware from "#middlewares/authMiddleware.js";
import { taskSchema } from "#schemas/taskSchema.js";
import { querySchema } from "#schemas/querySchema.js";

const tasksRouter = Router();

// Middleware de autenticación para todas las rutas de tareas
tasksRouter.use(authMiddleware);

// Rutas
tasksRouter.get("/", validateQuery(querySchema), taskController.getTasks);
tasksRouter.get("/export", taskController.exportTasks);
tasksRouter.get("/:id", taskController.getTaskByID);
tasksRouter.post("/", validateBody(taskSchema), taskController.postTask);
tasksRouter.patch("/:id", validateBody(taskSchema), taskController.patchTask);
tasksRouter.delete("/", taskController.deleteTasks);
tasksRouter.delete("/:id", taskController.deleteTaskByID);

// Rutas de importación de archivos
tasksRouter.post("/import", upload.single("tasks"), taskController.importTasks);
export default tasksRouter;
