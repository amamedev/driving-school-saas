import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuth = () => {
  // Obtener contexto
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
