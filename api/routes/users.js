const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = require("../models/users")

//Получение списка всех пользователей
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
    /*     if (!users.length) {
      res.status(404).json({
        message: `Пока нет ни одного пользователя`,
      })
    }
 */
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({
      message: "Что то пошло не так как надо",
    })
  }
})

//Создание пользователя

router.get("/new", (req, res, next) => {
  res.status(200).json({
    message: "Здесь будет загружать форма добавления нового пользователя",
  })
})

//Загрузка формы редактирования выбранного пользователя

router.post("/:userId/edit", (req, res, next) => {
  const id = req.params.userId
  User.find({ _id: id })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "User not found",
        })
      }

      res.status(200).json({
        message: `Редактируем пользователя с id: ${id}`,
        user,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

//Сохранения нового пользователя в базе
router.post("/", (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    login: req.body.login,
    password: req.body.password,
    name: req.body.name,
    cabinet: req.body.cabinet,
    start: req.body.start,
    end: req.body.end,
    userType: req.body.userType,
  })

  user
    .save()
    .then((data) => {
      res.status(201).json({
        message: "User was created",
        result: data,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//Получения одного пользователя по userId
router.get("/:id", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id })
    res.status(200).json({
      data,
      roles: data.getRoles,
    })
  } catch (e) {
    res.status(400).json({
      message: "Пользователь не найден",
    })
  }

  /*   const id = req.params.userId

  User.find({ _id: id })
    .exec()
    .then((user) => {
      res.status(200).json({
        message: `Handling GET request to fetch userID: ${id}`,
        user,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    }) */
})

//Обновление пользовательских полей
router.patch("/:id", async (req, res) => {
  const id = req.params.id
  console.log(id)
  const updateOps = {}

  for (let key in req.body) {
    updateOps[key] = req.body[key]
  }

  console.log(updateOps)

  try {
    await User.updateOne({ _id: req.params.id }, { $set: updateOps })
    res.status(200).json({
      message: "Данные пользователя обновлены",
    })
  } catch (e) {
    res.status(400).json({
      message: "something wrong",
    })
  }
})

//Удаление выбранного пользователя
router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({
      message: "Пользователь успешно удален",
    })
  } catch (e) {
    res.status(400).json({
      message: "Что то пошло не так. Попробуйте еще раз",
    })
  }
})

module.exports = router
