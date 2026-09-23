import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Chequear sesión al iniciar
  const checkSession = async (storedToken) => {
    try {
      const data = await authService.getMe(storedToken);

      setCurrentUser(data.user);
      setToken(storedToken);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      switch (error.status) {
        case 401:
          toast.error(
            "Sesión inválida o expirada. Por favor, inicia sesión nuevamente.",
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
          break;
        case 500:
          toast.error(
            "Error interno del servidor. Por favor, intenta nuevamente más tarde.",
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
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    checkSession(storedToken);
  }, []);

  const login = async (session) => {
    const user = session.user;
    const token = session.token;
    setCurrentUser(user);
    setToken(token);
    setLoading(false);
    setIsAuthenticated(true);

    localStorage.setItem("token", token);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setLoading(false);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
