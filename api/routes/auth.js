const express = require("express")
const router = express.Router()
const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const User = require("../models/users")

router.post("/register", [check("login", "Некорректный Логин").trim().isLength({ min: 3 }), check("password", "минимальная длина пароля 6 символов").isLength({ min: 6 })], async (req, res) => {
  try {
    const errors = validationResult(req)
    console.log(req.body)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации",
      })
    }
    const { login, password } = req.body
    const candidate = await User.findOne({ login })

    if (candidate) {
      return res.status(400).json({
        message: "Такой пользователь уже существует",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await new User({ login: req.body.login, password: hashedPassword })
    await user.save()

    res.status(201).json({
      message: "Пользователь создан",
    })
  } catch (e) {
    res.status(500).json({
      message: `Что то пошло не так????`,
    })
  }
})

router.post("/login", [check("login", "Введите корретный логин").trim().isLength({ min: 3 }), check("password", "Введите пароль").exists()], async (req, res) => {
  try {
    const errors = validationResult(req)
    console.log(req.body)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при входе",
      })
    }

    const { login, password } = req.body
    const user = await User.findOne({ login })
    if (!user) {
      return res.status(400).json({
        message: "пользователь не найден",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: "неверный пароль, попробуйте еще раз",
      })
    }

    /* const token = jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: "1h" }) */
    res.json({ message: "Вы вошли в систему" } /* , token, userId: user.id } */)
  } catch (e) {
    res.status(500).json({
      message: "Что то пошло не так. Попробуйте снова????",
    })
  }
})

module.exports = router
