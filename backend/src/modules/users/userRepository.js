import { adminClient } from "#infra/database/supabaseClients.js";

const userRepository = {
  getUsers: async () => {
    // Lógica para obtener usuarios
    const { data, error } = await adminClient
      .from("profiles")
      .select("id, name");

    if (error) {
      throw error;
    }

    return data;
  },
};

export default userRepository;
