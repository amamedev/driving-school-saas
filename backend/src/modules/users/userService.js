import { HttpError } from "#errors/httpErrorHandler.js";
import userRepository from "./userRepository.js";

const userService = {
  getUsers: async (currentUser) => {
    // Lógica para obtener usuarios
    if (currentUser.role !== "admin") {
      throw new HttpError(403, "Usuario no autorizado");
    }
    return userRepository.getUsers();
  },
};

export default userService;
