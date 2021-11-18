const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const { userType } = req.user;
  console.log(userType);

  try {
    if (userType === "user") {
      return res.status(403).json({
        message: "У вас нет прав доступа к запрашиваемому ресурсу",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Ошибка запроса",
    });
  }
};
