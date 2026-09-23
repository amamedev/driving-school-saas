import userService from "./userService.js";

const userController = {
  getUsers: async (req, res, next) => {
    try {
      const currentUser = req.user;
      const users = await userService.getUsers(currentUser);
      res.status(200).json({
        message: "Usuarios obtenidos",
        status: 200,
        success: true,
        data: {
          total: users.length,
          users: users,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
