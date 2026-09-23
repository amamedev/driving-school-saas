import { API_URL } from "@/services/api";

const tasksService = {
  // Obtener tareas
  getTasks: async (token, page, limit) => {
    const response = await fetch(
      `${API_URL}/tasks?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.status = response.status;
      throw error;
    }

    return data;
  },

  // Crear tarea
  createTask: async (token, newTask) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.status = response.status;
      throw error;
    }

    return data;
  },
  // Actualiza tarea
  updateTask: async (token, taskID, editedtask) => {
    const response = await fetch(`${API_URL}/tasks/${taskID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedtask),
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.status = response.status;
      throw error;
    }

    return data;
  },
  // Eliminar tarea
  deleteTask: async (token, taskID) => {
    const response = await fetch(`${API_URL}/tasks/${taskID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.status = response.status;
      throw error;
    }

    return data;
  },
};

export default tasksService;
