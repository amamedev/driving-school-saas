import taskService from "./taskService.js";

/**
 * Controller para el manejo de peticiones y respuestas HTML
 */
const taskController = {
  // Crear nuevo ticket
  postTask: async (req, res, next) => {
    try {
      const task = req.validatedBody;
      const createdTask = await taskService.createTask(task);

      res.status(201).json({
        message: "Tarea registrada correctamente",
        status: 201,
        success: true,
        data: {
          task: createdTask,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtener todos los tickets
  getTasks: async (req, res, next) => {
    try {
      const user = req.user;
      const limit = req.validatedQuery.limit || 20;
      const page = req.validatedQuery.page || 1;
      const data = await taskService.getTasks(user, limit, page);

      res.status(200).json({
        message: "Tareas obtenidas",
        status: 200,
        success: true,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtener tarea por id
  getTaskByID: async (req, res, next) => {
    try {
      const id = req.params.id;
      const task = await taskService.getTaskByID(id);
      res.status(200).json({
        status: 200,
        message: "Tarea obtenida",
        success: true,
        data: {
          task: task,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Actualizar tarea
  patchTask: async (req, res, next) => {
    try {
      const taskID = req.params.id;
      const currentUser = req.user;
      const changes = req.validatedBody;

      const updatedTask = await taskService.patchTask(
        taskID,
        currentUser,
        changes,
      );
      res.status(200).json({
        status: 200,
        message: "Tarea actualizada",
        success: true,
        data: {
          task: updatedTask,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Eliminar todos los tickets
  deleteTasks: async (req, res, next) => {
    try {
      const deletedTasks = await taskService.deleteTasks();
      res.status(200).json({
        status: 200,
        message: "Se han eliminado todas las tareas",
        success: true,
        data: {
          tasks: deletedTasks,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Eliminar tarea por id
  deleteTaskByID: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedTask = await taskService.deleteTaskByID(id);

      res.status(200).json({
        status: 200,
        message: "Tarea eliminada",
        success: true,
        data: {
          task: deletedTask,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Importación y exportación de archivos
   */
  importTasks: async (req, res, next) => {
    try {
      // Procesar el archivo CSV y crear los tickets
      console.log("Importando tareas...");
      const importedTasks = await taskService.importTasks(req.file);
      res.status(200).json({
        status: 200,
        message: "Tareas importadas",
        success: true,
        importedAt: new Date().toISOString(),
        data: {
          tasks: importedTasks,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Exportar tareas a CSV
  exportTasks: async (req, res, next) => {
    try {
      const csv = await taskService.exportTasks();
      res.download(csv);
    } catch (error) {
      next(error);
    }
  },
};

export default taskController;
