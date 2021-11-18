const express = require("express");
const router = express.Router();
const passGenerator = require("password-generator");
const mailService = require("../service/mail-service");

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { body, check, param, validationResult } = require("express-validator");
const User = require("../models/users");
const ApiError = require("../exceptions/api-error");
const { v4: uuidv4 } = require("uuid");

//Закрываем регистрацию пользователей

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 20 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
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
      //const password = passGenerator(12 ,false)
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
        `${process.env.API_SERVER}/auth/activate/${activationLink}`
      );

      res.status(201).json({
        message: "Пользователь создан",
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

      //const hashedPassword = await bcrypt.hash(password, 12);
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

      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        token,
        userId: user._id,
        userType: user.userType,
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

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        res.redirect(`${process.env.SITE_URL}/register`);
        /* return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для активации",
        });*/
      }

      const user = await User.findOne({ activationLink: uuid });

      if (!user) {
        return res.redirect(`${process.env.SITE_URL}/not_found`);
      }

      user.isActivated = true;
      await user.save();
      res.redirect(`${process.env.SITE_URL}/success`);
    } catch (error) {}
  }
);

module.exports = router;
