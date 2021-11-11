const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: "Пользователь не авторизован",
      errors: err.errors,
    });
  }

  return res.status(500).json({
    message: "Непредвиденная ошибка",
  });
};
