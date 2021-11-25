const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    if (err.status === 401) {
      return res.status(401).json({
        message: "Пользователь не авторизован",
      });
    }
    if (err.status === 400) {
      return res.status(400).json({
        message: "Некорректные данные при вводе",
      });
    }
  }

  return res.status(500).json({
    message: "Непредвиденная ошибка",
  });
};
