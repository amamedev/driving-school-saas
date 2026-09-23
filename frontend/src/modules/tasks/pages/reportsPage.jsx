import { useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import tasksService from "../services/tasks.service";

const ReportsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [pages, setPages] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    from: "",
    to: "",
  });

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const importCSV = () => {
    // aquí luego conectas backend
    toast.success("Importando CSV...");
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

  return (
    <div className="space-y-6 w-full">
      {/* =========================
          HEADER / FILTROS
          ========================= */}
      <header className="bg-white p-5 rounded-lg shadow space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800"> Informes </h1>
          <p className="text-gray-500">Filtra y exporta los datos de tareas</p>
        </div>
        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BUSCADOR */}
          <div className="flex flex-col md:col-span-3">
            <label htmlFor="search" className="text-sm text-gray-600 mb-1">
              Buscar
            </label>
            <input
              id="search"
              type="search"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Buscar por título, contenido o notas..."
              className="border rounded-lg p-2 text-sm"
            />
          </div>
          {/* ESTADO */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm text-gray-600 mb-1">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="all">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="en revision">En revisión</option>
              <option value="bloqueada">Bloqueada</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          {/* PRIORIDAD */}
          <div className="flex flex-col">
            <label htmlFor="priority" className="text-sm text-gray-600 mb-1">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="all">Todas</option>
              <option value="5">Muy alta</option>
              <option value="4">Alta</option> <option value="3">Media</option>
              <option value="2">Baja</option>
              <option value="1">Muy baja</option>
            </select>
          </div>
          {/* CATEGORÍA */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm text-gray-600 mb-1">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="all">Todas</option>
              <option value="theory">Teoría</option>
              <option value="practice">Prácticas</option>
              <option value="administration">Administración</option>
            </select>
          </div>
          {/* ASIGNADO A */}
          <div className="flex flex-col">
            <label htmlFor="assignedTo" className="text-sm text-gray-600 mb-1">
              Asignado a
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={filters.assignedTo}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="all">Todos</option>
              <option key={"test"} value={"test"}></option>
            </select>
          </div>
          {/* DESDE */}
          <div className="flex flex-col">
            <label htmlFor="from" className="text-sm text-gray-600 mb-1">
              Desde
            </label>
            <input
              id="from"
              type="date"
              name="from"
              value={filters.from}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            />
          </div>
          {/* HASTA */}
          <div className="flex flex-col">
            <label htmlFor="to" className="text-sm text-gray-600 mb-1">
              Hasta
            </label>
            <input
              id="to"
              type="date"
              name="to"
              value={filters.to}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            />
          </div>
          {/* ORDENAR POR */}
          <div className="flex flex-col">
            <label htmlFor="sortBy" className="text-sm text-gray-600 mb-1">
              Ordenar por
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="created_at">Fecha de creación</option>
              <option value="priority">Prioridad</option>
              <option value="title">Título</option>
              <option value="status">Estado</option>
            </select>
          </div>
          {/* DIRECCIÓN */}
          <div className="flex flex-col">
            <label htmlFor="sortOrder" className="text-sm text-gray-600 mb-1">
              Orden
            </label>
            <select
              id="sortOrder"
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>
        </div>

        {/* ACCIONES */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => getTasks()}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
          >
            Aplicar filtros
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-500">
            Importar CSV
          </button>

          <button
            onClick={() => alert("Exportando PDF...")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-500"
          >
            Exportar PDF
          </button>
        </div>
      </header>

      {/* =========================
    RESULTADOS
    ========================= */}

      <section className="bg-white rounded-lg shadow overflow-hidden">
        {/* CABECERA */}

        <div className="px-5 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Resultados
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {tasks?.length ?? 0} tareas encontradas
              </p>
            </div>
          </div>
        </div>

        {/* LISTA DE RESULTADOS */}

        {tasks?.length > 0 ? (
          <div className="p-4 space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => handleTaskClick(task.id)}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition text-left"
              >
                {/* INFORMACIÓN DE LA TAREA */}

                <div className="min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Asignada a{" "}
                    <span className="font-medium text-gray-600">
                      {task.assignedUser?.name ?? "Sin asignar"}
                    </span>
                  </p>
                </div>

                {/* FLECHA */}

                <span className="text-gray-400 text-xl shrink-0">→</span>
              </button>
            ))}
          </div>
        ) : (
          /* =========================
       ESTADO VACÍO
       ========================= */

          <div className="flex flex-col items-center justify-center py-20 px-5">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z"
                />
              </svg>
            </div>

            <h3 className="text-base font-semibold text-gray-800">
              No hay tareas para mostrar
            </h3>

            <p className="text-sm text-gray-500 mt-1 text-center max-w-sm">
              No se encontraron tareas con los filtros seleccionados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReportsPage;
