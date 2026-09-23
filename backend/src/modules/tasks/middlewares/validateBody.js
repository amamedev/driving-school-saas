import { HttpError } from "#errors/httpErrorHandler.js";

const validateBody = (schema) => (req, res, next) => {
  try {
    const validatedBody = schema.parse(req.body);
    req.validatedBody = validatedBody;
    next();
  } catch (error) {
    console.log(error);

    throw new HttpError(422, "Datos de la tarea no válidos");
  }
};

export default validateBody;
