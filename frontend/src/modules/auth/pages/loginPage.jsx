import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import authService from "../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Contexto de autenticación
  const { login, token } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  // Manejador del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Por favor, completa todos los campos", {
        style: {
          background: "red",
          width: "400px",
          fontSize: "16px",
          color: "#fff",
        },
      });
    }

    try {
      const session = await authService.login(form);
      toast.success(session.message, {
        style: {
          background: "green",
          width: "400px",
          fontSize: "16px",
          color: "#fff",
        },
      });
      // Guardar sesión en el contexto
      login(session);

      // Redirigir a dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error al iniciar sesión", {
        style: {
          background: "red",
          width: "400px",
          fontSize: "16px",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-1xl text-[var(--text-color)] font-bold mb-7">
        AU Gestión
      </h1>
      <form
        className="flex flex-col w-80 gap-4 bg-white p-4 rounded-lg shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded-lg p-2"
        />
        <label className="flex text-xs items-center gap-2">
          <input
            type="checkbox"
            className="border w-3.5 h-3.5 border-gray-300 rounded-lg p-2"
          />
          Recordarme
        </label>
        <button
          type="submit"
          className="bg-[var(--accent)] text-white rounded-lg p-2 hover:bg-[var(--accent-hover)]"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
