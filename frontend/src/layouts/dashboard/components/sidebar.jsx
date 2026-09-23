import { NavLink } from "react-router-dom";
import { Home, CheckSquare, BarChart3 } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-[var(--accent-bg)] flex flex-col h-screen">
      {/* LOGO */}
      <div className="h-16 flex items-center px-6">
        <h1 className="text-xl text-[var(--sb-hd-text)] font-bold">
          AU Gestión
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6">
        {/* GENERAL (FIX: end añadido) */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive
                ? "text-[var(--accent)] font-semibold"
                : "text-[var(--bg)] hover:text-[var(--accent)]"
            }`
          }
        >
          <Home size={22} />
          General
        </NavLink>

        {/* TAREAS */}
        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive
                ? "text-[var(--accent)] font-semibold"
                : "text-[var(--bg)] hover:text-[var(--accent)]"
            }`
          }
        >
          <CheckSquare size={22} />
          Tareas
        </NavLink>

        {/* INFORMES */}
        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive
                ? "text-[var(--accent)] font-semibold"
                : "text-[var(--bg)] hover:text-[var(--accent)]"
            }`
          }
        >
          <BarChart3 size={22} />
          Informes
        </NavLink>
      </nav>

      {/* USER SECTION */}
      <div className="p-4 flex items-center gap-3">
        {/* AVATAR */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-[var(--bg)]">
          JP
        </div>

        {/* USER INFO */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-[var(--bg)]">
            Juan Pérez
          </span>
          <span className="text-xs text-[var(--bg)]">Administrador</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
