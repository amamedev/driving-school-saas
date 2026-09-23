import emitter from "./events/eventBus.js";
import taskRepository from "./taskRepository.js";
import fs from "fs";
import { HttpError } from "#errors/httpErrorHandler.js";
import { csvToJson, jsonToCsv } from "#utils/importExportCsv.js";
import path from "path";

/**
 * Service para la lógica del sistema de ticketing
 */

const ticketService = {
  // Lógica para crear un ticket
  createTask: async (task) => {
    // Guardar en base de datos
    const createdTask = await taskRepository.addTicket(task);

    if (!createdTask) {
      throw new HttpError(500, "Error al crear la tarea");
    }

    // Emitir evento
    emitter.emit("createdTask", createdTask);

    return createdTask;
  },

  // Lógica para obtener todos los tickets
  getTasks: async (user, limit, page) => {
    const start = (page - 1) * limit;
    const end = start + limit;

    if (user && user.role !== "admin") {
      const { tasks, total } = await taskRepository.getTasksByUser(
        user.id,
        start,
        end,
      );
      return {
        tasks: tasks,
        pagination: {
          page: page,
          limit: limit,
          total: total,
        },
      };
    }

    const { tasks, total } = await taskRepository.getTasks(start, end);

    return {
      tasks: tasks,
      pagination: {
        page: page,
        limit: limit,
        total: total,
      },
    };
  },

  // Lógica paraa obtener un ticket por su id
  getTaskByID: async (id) => {
    const task = await taskRepository.getTaskByID(id);
    if (!task) {
      throw new HttpError(404, "Tarea no encontrada");
    }
    return task;
  },

  // Lógica para actualizar un ticket
  patchTask: async (taskID, currentUser, changes) => {
    // Obtener tarea para comprobar asignación
    const currentTask = await taskRepository.getTaskByID(taskID);
    if (!currentTask) {
      throw new HttpError(404, "Tarea no encontrada");
    }

    // Si el usuario no es el asignado y no es admin, denegar
    if (
      currentUser.role !== "admin" &&
      currentTask.assigned_to !== currentUser.profileID
    ) {
      throw new HttpError(403, "No tienes permiso para actualizar esta tarea");
    }

    const updateData = {
      title: changes.title,
      status: changes.status,
      priority: changes.priority,
      category_id: changes.category_id,
      content: changes.content,
      notes: changes.notes,
    };

    // Solo los admin pueden cambiar el asignado
    if (currentUser.role === "admin" && changes.assigned_to) {
      updateData.assigned_to = changes.assigned_to;
    }

    return taskRepository.patchTask(taskID, updateData);
  },

  // Lógica para eliminar todos los tickets
  deleteTasks: async () => {
    const tasks = await taskRepository.deleteTasks();
    if (!tasks) {
      throw new HttpError(404, "No se encontraron tareas para eliminar");
    }
    return tasks;
  },

  // Lógica para eliminar un ticket por su id
  deleteTaskByID: async (id) => {
    const task = await taskRepository.deleteTaskByID(id);
    if (!task) {
      throw new HttpError(404, "Tarea no encontrada");
    }
    return task;
  },

  // Lógica para importar tareas desde un archivo
  importTasks: async (file) => {
    // Validar que se haya seleccionado un archivo
    if (!file) {
      throw new HttpError(400, "No se ha seleccionado ningún archivo");
    }

    // Validar tipo de archivo
    if (!file.originalname.endsWith(".csv")) {
      throw new HttpError(400, "El archivo debe ser un CSV");
    }

    // Validar que el archivo exista
    if (!fs.existsSync(file.path)) {
      throw new HttpError(404, "Archivo no encontrado en el servidor");
    }

    // Convertir el archivo a JSON
    let convertCsv;
    try {
      convertCsv = await csvToJson(file.path);
    } catch (error) {
      throw new HttpError(500, "Error al parsear el archivo");
    }

    // Validar que se hayan encontrado tickets en el archivo
    if (convertCsv.length === 0) {
      throw new HttpError(400, "No se encontraron tareas en el archivo");
    }

    // Procesar las tareas
    const processedTasks = await taskPipeline(convertCsv);
    if (!processedTasks) {
      throw new HttpError(500, "Error al procesar las tareas");
    }

    // Importar las tareas
    let importedTasks;
    try {
      importedTasks = await taskRepository.importTasks(processedTasks);
    } catch (error) {
      throw new HttpError(500, "Error de base de datos");
    }

    return importedTasks;
  },

  // Logica para exportar tareas a CSV
  exportTasks: async () => {
    const tasks = await taskRepository.exportTasks();
    const filename = "export" + Date.now() + ".csv";
    const filePath = path.join(
      process.cwd(),
      "public",
      "files",
      "exports",
      filename,
    );
    const csv = await jsonToCsv(tasks, filePath);
    if (!csv) {
      throw new HttpError(500, "Error al exportar tareas");
    }
    return filePath;
  },
};

export default ticketService;
