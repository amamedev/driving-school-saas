import categoriesService from "./categoriesService.js";

const categoriesController = {
  getCategories: async (req, res, next) => {
    try {
      const currentUser = req.user;
      const categories = await categoriesService.getCategories(currentUser);
      res.status(200).json({
        message: "Categorías obtenidas",
        status: 200,
        success: true,
        data: {
          total: categories.length,
          categories: categories,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default categoriesController;
