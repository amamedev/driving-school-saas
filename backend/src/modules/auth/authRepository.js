import { adminClient, authClient } from "#infra/database/supabaseClients.js";

const authRepository = {
  login: async (user) => {
    try {
      // Iniciar sesión con Supabase
      const { data: authData, error: authError } =
        await authClient.auth.signInWithPassword(user);
      if (authError) {
        throw authError;
      }

      // Obtener perfil del usuario
      const userID = authData.user.id;
      const { data: profile, error: profileError } = await adminClient
        .from("profiles")
        .select("role, name")
        .eq("id", userID)
        .single();

      if (profileError) {
        throw profileError;
      }

      const userData = {
        authData,
        profile,
      };

      return userData;
    } catch (error) {
      throw error;
    }
  },
};

export default authRepository;
