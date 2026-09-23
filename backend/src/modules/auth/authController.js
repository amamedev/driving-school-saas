import authService from "./authService.js";

const authController = {
  login: async (req, res, next) => {
    try {
      // Llamar al servicio de autenticación
      const user = req.validatedUser;
      const userDto = await authService.login(user);

      res.status(200).json(userDto);
    } catch (error) {
      next(error);
    }
  },
  getMe: async (req, res, next) => {
    try {
      const user = req.user;
      res.status(200).json({
        message: "Usuario autenticado",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
