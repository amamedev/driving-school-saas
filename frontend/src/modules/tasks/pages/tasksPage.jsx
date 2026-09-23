import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import tasksService from "../services/tasks.service";
import usersService from "../../users/services/users.service";
import categoriesService from "../../categories/services/categories.service";
import useAuth from "../../auth/hooks/useAuth";
import { Trash2 } from "lucide-react";
import Modal from "@/layouts/dashboard/components/Modal";
import TaskForm from "@/layouts/dashboard/components/Modals/TaskForm";
import ConfirmDialog from "@/layouts/dashboard/components/Modals/ConfirmDialog";
import { toast } from "sonner";

const TasksPage = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({
    limit: 20,
  });

  // Obtener el token y el usuario actual
  const { token, currentUser, logout } = useAuth();

  // Obtener parámetros de la URL
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 20;

  const handlePages = (pagination) => {
    const calcPages = Math.ceil(pagination.total / pagination.limit);

    if (calcPages <= 5) {
      setPages([1, 2, 3, 4, 5]);
    }
  };

  // Manejo de errores
  const errorHandler = (errorCode) => {
    toast.error(
      errorCode === 401
        ? "Sesión inválida o expirada. Por favor, inicia sesión nuevamente."
        : "Error interno del servidor. Por favor, intenta nuevamente más tarde.",
      {
        style: {
          background: "red",
          width: "550px",
          fontSize: "16px",
          color: "#fff",
        },
      },
    );
    logout();
  };

  // Efecto para obtener datos dinámicos (tareas)
  useEffect(() => {
    if (!token) {
      return;
    }

    // Llamar a la API para obtener las tareas
    const getTasks = async () => {
      try {
        const fetchData = await tasksService.getTasks(token, page, limit);
        const tasks = fetchData?.data?.tasks || [];
        const getPagination = fetchData?.data?.pagination || [];
        setTasks(tasks);
        setPagination(getPagination);
        handlePages(getPagination);
      } catch (error) {
        errorHandler(error.status);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [page, limit]);

  // Efecto para obtener datos estáticos
  useEffect(() => {
    if (!token) {
      return;
    }

    const getUsers = async () => {
      try {
        const fetchUsers = await usersService.getUsers(token);
        const users = fetchUsers?.data?.users || [];
        setUsers(users);
      } catch (error) {
        if (error.status === 500) {
          toast.error("No se pudieron obtener los usuarios", {
            style: {
              background: "red",
              width: "400px",
              fontSize: "16px",
              color: "#fff",
            },
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        const fetchCategories = await categoriesService.getCategories(token);
        const categories = fetchCategories?.data?.categories || [];
        setCategories(categories);
      } catch (error) {
        if (error.status === 500) {
          toast.error("No se pudieron obtener las categorías", {
            style: {
              background: "red",
              width: "400px",
              fontSize: "16px",
              color: "#fff",
            },
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.role === "admin") {
      getUsers();
    }
    getCategories();
  }, [currentUser]);

  // Marcar/desmarcar todos los checkboxes de tareas
  const handleSelectAll = () => {
    // Marcar los checkboxes de todas las tareas que se muestran en la pagina
    const checkboxes = document.querySelectorAll(".check-task");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !checkbox.checked;
    });
  };

  // Actualizar tareas después de crear una
  const handleCreateTask = (createdTask) => {
    setTasks((prevTasks) => [...prevTasks, createdTask]);
    setIsCreateModalOpen(false);
  };

  // Actualizar una tarea después de editar
  const handleUpdateTask = (updatedTask) => {
    setEditingTask(null);
    // Actualizar la tarea en la lista
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  // Eliminar una tarea
  const handleDeleteTask = () => {
    // Eliminar la tarea de la lista
    const deleteTask = async () => {
      try {
        const deletedTask = tasksService.deleteTask(token, deletingTask);
        toast.promise(deletedTask, {
          loading: "Eliminando tarea...",
          success: () => {
            return `Tarea eliminada correctamente`;
          },
          error: "Error",
        });

        const data = await deletedTask;
        if (data.success) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== deletingTask),
          );
        }
      } catch (error) {
        toast.error(error.message, {
          style: {
            background: "red",
            width: "400px",
            fontSize: "16px",
            color: "#fff",
          },
        });
      } finally {
        setDeletingTask(null);
      }
    };
    deleteTask();
  };

  return (
    <div className="flex flex-col items-start gap-6">
      {/* Modales para crear, editar y eliminar tareas */}

      {/* Crear tarea*/}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear tarea"
      >
        <TaskForm
          mode="create"
          users={users}
          categories={categories}
          token={token}
          onSuccess={handleCreateTask}
          currentUser={currentUser}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
      </Modal>

      {/* Editar tarea */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Editar tarea"
      >
        <TaskForm
          mode="edit"
          task={editingTask}
          users={users}
          categories={categories}
          token={token}
          onSuccess={handleUpdateTask}
          currentUser={currentUser}
          setEditingTask={setEditingTask}
        />
      </Modal>

      {/* Eliminar tarea */}
      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        title="Eliminar tarea"
        description="¿Estás seguro de que quieres eliminar esta tarea?"
        cancelText="Cancelar"
        confirmText="Eliminar"
        onConfirm={handleDeleteTask}
      />
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-zinc-900">
            Gestión de tareas
          </h1>

          <p className="text-sm text-zinc-500">
            Administra todas las tareas de la autoescuela
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
            Eliminar seleccionadas
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent)]"
          >
            Nueva tarea
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 text-left">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="cursor-pointer"
                  />
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Tarea
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Estado
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Prioridad
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Asignado a
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Categoría
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Fecha
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="transition hover:bg-[var(--accent-hover)]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="check-task cursor-pointer"
                      />

                      {currentUser?.role === "admin" && (
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                          title="Eliminar"
                          onClick={() => setDeletingTask(task.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start">
                      <span
                        className="font-medium text-zinc-900 cursor-pointer"
                        onClick={() => setEditingTask(task)}
                      >
                        {task.title}
                      </span>

                      <span className="text-sm text-zinc-500">
                        {task.description}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {task.status === "completada" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Completada
                      </span>
                    )}
                    {task.status === "pendiente" && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                        Pendiente
                      </span>
                    )}
                    {task.status === "en revision" && (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        En revisión
                      </span>
                    )}
                    {task.status === "en progreso" && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        En progreso
                      </span>
                    )}
                    {task.status === "bloqueada" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Bloqueada
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {task.priority === 5 && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Muy alta
                      </span>
                    )}
                    {task.priority === 4 && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-orange-700">
                        Alta
                      </span>
                    )}
                    {task.priority === 3 && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                        Media
                      </span>
                    )}
                    {task.priority === 2 && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Baja
                      </span>
                    )}
                    {task.priority === 1 && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Muy baja
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {task.profiles?.name || "Sin asignar"}
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {
                      categories.find(
                        (category) => category.id === task.category_id,
                      )?.title
                    }
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-start gap-4 border-t border-zinc-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">
            Mostrando {pagination.page === 1 ? 1 : 20 + tasks.length} -{" "}
            {pagination.page === 1 ? tasks.length : 20 + tasks.length} de{" "}
            {pagination.total} tareas
          </p>

          <div className="flex items-center gap-2">
            {parseInt(searchParams.get("page")) > 1 && (
              <button
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100"
                onClick={() =>
                  setSearchParams({
                    page: parseInt(searchParams.get("page")) - 1,
                  })
                }
              >
                Anterior
              </button>
            )}

            {pages.map((page) => {
              <button
                className={
                  pagination.page == page
                    ? "rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white"
                    : "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100"
                }
              >
                page
              </button>;
            })}

            <button
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100"
              onClick={() => {
                const currentPage = parseInt(searchParams.get("page")) || 1;
                setSearchParams({
                  page: currentPage + 1,
                });
              }}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
