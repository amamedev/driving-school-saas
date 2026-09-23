import { adminClient } from "#infra/database/supabaseClients.js";

const categoriesRepository = {
  getCategories: async () => {
    // Lógica para obtener categorías
    const { data, error } = await adminClient
      .from("tasks_categories")
      .select("id, title");

    if (error) {
      throw error;
    }

    return data;
  },
};

export default categoriesRepository;
