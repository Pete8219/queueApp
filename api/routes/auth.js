const express = require("express");
const router = express.Router();

const mailService = require("../service/mail-service");

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { body, check, param, validationResult } = require("express-validator");
const User = require("../models/users");
const ApiError = require("../exceptions/api-error");
const { v4: uuidv4 } = require("uuid");

//Регистрация пользователя

router.post(
  "/register",
  body("email", "В поле Логин должен быть ваш email адрес")
    .isEmail()
    .normalizeEmail(),
  body("password")
    .isLength({
      min: 8,
      max: 20,
    })
    .withMessage("Пароль должен быть не менее 8 символов")
    .matches(/\d/)
    .withMessage("Пароль должен содержать хотя бы одну цифру")
    .matches(/([A-Z])/)
    .withMessage("Пароль должен содержать хотя бы одну заглавную букву"),
  async (req, res) => {
    console.log(req.body);

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(200).json({
          errors: errors.array(),
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ login: email });

      if (candidate) {
        return res.status(400).json({
          message: "Такой пользователь уже существует",
        });
      }
      const activationLink = uuidv4();

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        login: email,
        password: hashedPassword,
        activationLink,
      });
      await user.save();

      //Отправка письма с кодом активации на email пользователя

      await mailService.sendActivationLink(
        email,
        password,
        `${process.env.CLIENT_URL}/confirm/${activationLink}`
      );

      res.status(200).json({
        message: "Пользователь создан",
        status: "200",
      });
    } catch (e) {
      res.status(500).json({
        message: `Ошибка запроса`,
      });
    }
  }
);

router.post(
  "/login",
  [
    check("login", "Логин должен быть ваш email").normalizeEmail({
      gmail_remove_dots: false,
    }),
    check("password", "Пароль не может быть пустым")
      .exists()
      .isLength({ min: 8 }),
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

      console.log(login);

      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      if (!user.isActivated) {
        return res.status(403).json({
          message: "Вы еще не активировали свой аккаунт",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        { userId: user._id, userType: user.userType, name: user.name },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        token,
        userType: user.userType,
        userId: user._id,
        name: user.name,
        login: user.login,
        email: user.email,
        phone: user.phone,
      });
    } catch (e) {
      res.status(500).json({
        message: "Что то пошло не так!!!",
      });
    }
  }
);

router.get(
  "/activate/:uuid",
  param("uuid").not().isEmpty().trim().escape(),
  async (req, res) => {
    const { uuid } = req.params;
    console.log(uuid);

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(200).json({
          errors: errors.array(),
        });
        /* res.redirect(`${process.env.SITE_URL}/register`); */
      }

      const user = await User.findOne({ activationLink: uuid });

      if (!user) {
        return res.status(404).json({
          message: "Неверный код активации учетной записи",
        });
        /* return res.redirect(`${process.env.SITE_URL}/not_found`); */
      }

      user.isActivated = true;
      await user.save();
      return res.status(200).json();
      /* res.redirect(`${process.env.SITE_URL}/success`); */
    } catch (error) {}
  }
);

router.post("/checkToken", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      message: "Пользователь не авторизован",
    });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET);
    data.token = token;
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка выполнения запроса",
      error,
    });
  }
});

module.exports = router;
