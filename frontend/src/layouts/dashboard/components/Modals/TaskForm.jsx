import { useState, useEffect } from "react";
import tasksService from "@/modules/tasks/services/tasks.service";
import { toast } from "sonner";

const TaskForm = ({
  mode,
  task,
  users,
  categories,
  token,
  onSuccess,
  setEditingTask,
  setIsCreateModalOpen,
  currentUser,
}) => {
  const initialFormData = {
    title: "",
    status: "pendiente",
    priority: 3,
    assigned_to: "",
    category_id: "",
    content: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (mode === "edit" && task) {
      setFormData({
        title: task.title,
        status: task.status,
        priority: task.priority,
        assigned_to: task.assigned_to ?? "",
        category_id: task.category_id ?? "",
        content: task.content ?? "",
        notes: task.notes ?? "",
      });
    }
  }, [mode, task]);

  // Handler para el submit en modo create
  const createHandleOnSubmit = (e) => {
    e.preventDefault();
    // Lógica para crear tarea
    const newTask = {
      ...formData,
      category_id: formData.category_id || null,
      assigned_to: formData.assigned_to || null,
    };

    try {
      const createTask = async () => {
        const create = tasksService.createTask(token, newTask);
        toast.promise(create, {
          loading: "Creando tarea...",
          success: () => {
            return `Tarea creada correctamente`;
          },
          error: "Error",
        });

        const data = await create;
        const createdTask = data.data.task[0];
        // Cerrar modal y actualizar estado de la página de tareas
        onSuccess(createdTask);
        // Resetear el formulario
        setFormData(initialFormData);
      };
      createTask();
    } catch (error) {
      console.error(error);
    }
  };

  // Handler para el submit cuando estamos en modo edición
  const editHandleOnSubmit = (e) => {
    e.preventDefault();
    // Lógica para editar tarea
    const editedTask = {
      ...formData,
      category_id: formData.category_id || null,
      assigned_to: formData.assigned_to || null,
    };
    const taskID = task.id;

    try {
      const updateTask = async () => {
        const update = tasksService.updateTask(token, taskID, editedTask);
        toast.promise(update, {
          loading: "Actualizando tarea...",
          success: () => {
            return `Tarea actualizada correctamente`;
          },
          error: "Error",
        });

        const data = await update;
        const updatedTask = data.data.task;
        // Cerrar modal y actualizar estado de la página de tareas
        onSuccess(updatedTask);
        // Resetear el formulario
        setFormData(initialFormData);
      };
      updateTask();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={mode === "create" ? createHandleOnSubmit : editHandleOnSubmit}
    >
      {/* Primera fila */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Estado</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="en revision">En revisión</option>
            <option value="bloqueada">Bloqueada</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>

      {/* Segunda fila */}
      <div
        className={
          currentUser.role === "admin"
            ? "grid grid-cols-2 gap-4"
            : "grid grid-cols-1 gap-4"
        }
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Prioridad</label>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value={5}>Muy alta</option>
            <option value={4}>Alta</option>
            <option value={3}>Media</option>
            <option value={2}>Baja</option>
            <option value={1}>Muy baja</option>
          </select>
        </div>

        {currentUser.role === "admin" && (
          <div>
            <label className="mb-2 block text-sm font-medium">Asignada a</label>
            <select
              value={formData.assigned_to}
              onChange={(e) =>
                setFormData({ ...formData, assigned_to: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Sin asignar</option>

              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tercera fila */}
      <div>
        <label className="mb-2 block text-sm font-medium">Categoría</label>
        <select
          value={formData.category_id}
          onChange={(e) =>
            setFormData({ ...formData, category_id: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">Sin clasificar</option>

          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            );
          })}
        </select>
      </div>

      {/* Cuarta fila */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Descripción</label>
          <textarea
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Notas</label>
          <textarea
            rows={6}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
          onClick={() => {
            setIsCreateModalOpen
              ? setIsCreateModalOpen(false)
              : setEditingTask(null);
          }}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          {mode === "create" ? "Crear tarea" : "Editar tarea"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
