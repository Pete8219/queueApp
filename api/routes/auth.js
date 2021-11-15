const express = require("express");
const router = express.Router();
const activatelogin = require("../utils/activateLogin");

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const bcrypt = require("bcryptjs");
const {
  body,
  check,
  param,
  validationResult,
  checkSchema,
} = require("express-validator");
const User = require("../models/users");
const ApiError = require("../exceptions/api-error");
const { v4: uuidv4 } = require("uuid");

//Закрываем регистрацию пользователей

router.post("/register", body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации",
      });
    }
    const { email } = req.body;
    const candidate = await User.findOne({ login: email });

    if (candidate) {
      return res.status(400).json({
        message: "Такой пользователь уже существует",
      });
    }

    /*       const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        login: req.body.login,
        password: hashedPassword,
      });
      await user.save(); */

    /* console.log(
      `${process.env.SITE_URL}/users/${req.body.email}/activate/${uuidv4()}`
    ); */

    //Отправка письма с кодом активации на email пользователя

    activatelogin(req);

    res.status(201).json({
      message: "Пользователь создан",
    });
  } catch (e) {
    res.status(500).json({
      message: `Ошибка запроса`,
    });
  }
});

router.post(
  "/login",
  [
    check("login", "Введите корретный логин").trim().isLength({ min: 3 }),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе",
        });
      }

      const { login, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);
      //console.log(hashedPassword)

      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      const current = new Date();
      const expirateDate = current.getTime() + 60 * 60 * 1000;

      res.json({
        token,
        userId: user.id,
        userType: user.userType,
        exp: expirateDate,
      });
    } catch (e) {
      res.status(500).json({
        message: "Что то пошло не так!!!",
      });
    }
  }
);

router.get("/verifyToken/:token", async (req, res) => {
  console.log(req.params.token);
  if (!req.params.token || null) {
    return;
  }

  try {
    const decode = jwtDecode(req.params.token);
    res.status(200).json(decode);
  } catch (error) {
    res.status(500).json("Something wrong");
  }
});

router.get(
  "/activate/:email/:uuid",
  param("email").isEmail().normalizeEmail(),
  param("uuid").not().isEmpty().trim().escape(),
  async (req, res) => {
    const { email: login, uuid } = req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.redirect(`${process.env.SITE_URL}/register`);
        /* return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для активации",
        });*/
      }

      res.status(200).json({
        message: "Даные валидны",
      });
    } catch (error) {}
  }
);

module.exports = router;
