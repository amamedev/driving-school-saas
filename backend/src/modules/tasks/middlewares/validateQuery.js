import { HttpError } from "#errors/httpErrorHandler.js";

const validateQuery = (schema) => (req, res, next) => {
  try {
    const validatedQuery = schema.parse(req.query);
    req.validatedQuery = validatedQuery;
    next();
  } catch (error) {
    console.log(error);

    throw new HttpError(422, "Datos de la tarea no válidos");
  }
};

export default validateQuery;
