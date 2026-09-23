import { adminClient, authClient } from "#infra/database/supabaseClients.js";
import { z } from "zod";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  // Validación del token
  const authSchema = z.object({
    token: z.string().min(1),
  });
  const validateToken = authSchema.safeParse({ token });

  if (!validateToken.success) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  // Obtener usuario y claims del token de la base de datos
  const { data, error } = await authClient.auth.getUser(token);

  if (error) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  // Obtener perfil del usuario
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("id, name, role")
    .eq("id", data.user.id)
    .single();

  // if (profileError) {
  //   return res
  //     .status(401)
  //     .json({ message: "Acceso no autorizadodasdasd", status: 401 });
  // }

  req.user = {
    id: data.user.id,
    email: data.user.email,
    profileID: profile.id,
    role: profile.role,
    name: profile.name,
  };

  next();
};

export default authMiddleware;
