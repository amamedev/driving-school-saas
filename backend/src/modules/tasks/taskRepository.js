/**
 * Respositorio para gestionar datos de base de datos (CRUD)
 */

import { adminClient } from "#infra/database/supabaseClients.js";
import { HttpError } from "#errors/httpErrorHandler.js";

/**
 * Objeto repositorio de tasks
 */
const ticketRepository = {
  // Añadir ticket a la base de datos
  addTicket: async (newTask) => {
    const { data, error } = await adminClient
      .from("tasks")
      .insert(newTask)
      .select();

    if (error) {
      throw error;
    }

    return data;
  },

  // Obtener todos los tasks
  getTasks: async (start, end) => {
    const { data, error, count } = await adminClient
      .from("tasks")
      .select("*, profiles(name)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end - 1);

    if (error) {
      throw new HttpError(500, error.message);
    }

    return {
      tasks: data,
      total: count,
    };
  },

  // Obtener tasks por usuario
  getTasksByUser: async (userId, start, end) => {
    const { data, error, count } = await adminClient
      .from("tasks")
      .select("*", { count: "exact" })
      .eq("assigned_to", userId)
      .range(start, end - 1);

    if (error) {
      throw new HttpError(500, error.message);
    }

    return {
      tasks: data,
      total: count,
    };
  },

  // Obtener ticket por id
  getTaskByID: async (id) => {
    try {
      const { data, error } = await adminClient
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new HttpError(500, error.message);
      }

      return data;
    } catch (error) {
      throw new Error("Error al obtener tarea: " + error.message);
    }
  },

  // Actualizar ticket
  patchTask: async (id, changes) => {
    const { data, error } = await adminClient
      .from("tasks")
      .update(changes)
      .eq("id", id)
      .select("*, profiles(name)")
      .single();

    if (error) {
      throw new HttpError(500, error.message);
    }

    return data;
  },

  // Eliminar todos los tasks
  deleteTasks: async () => {
    try {
      const { data, error } = await adminClient
        .from("tasks")
        .delete()
        .eq("id", "*");
      return data;
    } catch (error) {
      throw new Error("Error al eliminar tareas: " + error.message);
    }
  },

  // Eliminar ticket por id
  deleteTaskByID: async (id) => {
    const { data, error } = await adminClient
      .from("tasks")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return data;
  },

  // Importar tasks
  importTasks: async (processedTasks) => {
    try {
      const { data, error } = await adminClient
        .from("tasks")
        .insert(processedTasks)
        .select();
      return data;
    } catch (error) {
      throw new Error("Error al importar tareas: " + error.message);
    }
  },

  // Exportar tasks
  exportTasks: async () => {
    try {
      const { data, error } = await adminClient.from("tasks").select("*");
      return data;
    } catch (error) {
      throw new Error("Error al exportar tareas: " + error.message);
    }
  },
};

export default ticketRepository;
