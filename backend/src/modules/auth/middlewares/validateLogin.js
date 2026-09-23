const validateLogin = (schema) => (req, res, next) => {
  const credentials = req.body || {};
  const { email, password } = credentials;

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Debes proporcionar email y contraseña" });
  }

  const validatedUser = schema.safeParse(credentials);
  if (!validatedUser.success) {
    return res.status(400).json({
      message: "Email o contraseña incorrectos",
    });
  }

  req.validatedUser = validatedUser.data;

  next();
};

export default validateLogin;
