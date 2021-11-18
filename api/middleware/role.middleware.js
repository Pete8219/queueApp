const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (types) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
      }

      const { userType } = jwt.verify(token, process.env.SECRET);

      let hasRole = false;
      if (types.includes(userType)) {
        hasRole = true;
      }

      if (!hasRole) {
        return res.status(403).json({
          message: "У вас нет прав для доступа к запрашиваемому ресурсу",
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Пользователь на авторизован" });
    }
  };
};
