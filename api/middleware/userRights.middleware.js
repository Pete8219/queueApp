module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const { userType } = req.user;

  try {
    if (userType === "user" || userType === "manager") {
      return res.status(403).json({
        message: "Недостаточно прав для совершения операции",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Ошибка запроса",
    });
  }
};
