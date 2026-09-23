import authRepository from "./authRepository.js";
import { HttpError } from "#errors/httpErrorHandler.js";

const authService = {
  login: async (user) => {
    // Lógica de autenticación
    const login = await authRepository.login(user);

    if (!login) {
      throw new HttpError(
        500,
        "Hubo un error al intentar iniciar sesión, por favor intentalo de nuevo",
      );
    }

    const userDto = {
      message: `Bienvenido ${login.authData.user.email}`,
      token: login.authData.session.access_token,
      user: {
        id: login.authData.user.id,
        email: login.authData.user.email,
        role: login.profile.role,
        name: login.profile.name,
      },
    };

    return userDto;
  },
};

export default authService;
