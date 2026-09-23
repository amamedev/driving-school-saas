import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/modules/auth/pages/loginPage";
import TasksPage from "@/modules/tasks/pages/tasksPage";
import DashboardLayout from "@/layouts/dashboard/dashboardLayout";
import GeneralPage from "@/modules/tasks/pages/generalPage";
import ReportsPage from "@/modules/tasks/pages/reportsPage";
import ProtectedRoute from "./protectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/** Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/** Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<GeneralPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Route>

        {/** Ruta 404 */}
        {/* <Route path="*" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
