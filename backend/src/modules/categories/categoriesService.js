import { HttpError } from "#errors/httpErrorHandler.js";
import categoriesRepository from "./categoriesRepository.js";

const categoriesService = {
  getCategories: async (currentUser) => {
    // Lógica para obtener categorías
    try {
      return await categoriesRepository.getCategories();
    } catch (error) {
      throw new HttpError(500, "Error al obtener categorías");
    }
  },
};

export default categoriesService;
