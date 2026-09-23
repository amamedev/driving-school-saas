import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/modules/auth/hooks/useAuth";
import { BounceLoader } from "react-spinners";

const ProtectedRoute = () => {
  // Obtener contexto de autenticación
  const { token, loading } = useAuth();

  // No mostrar UI mientras se carga
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="var(--accent)" size={100} />
      </div>
    );

  // Redirigir a login si no hay token
  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
