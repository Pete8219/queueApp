const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

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
router.get("/:userId", (req, res, next) => {
  const id = req.params.userId

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
    })
})

//Обновление пользовательских полей
router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId

  const updateOps = {}

  for (ops of req.body) {
    updateOps[ops.propName] = ops.value
  }

  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//Удаление выбранного пользователя
router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

module.exports = router
