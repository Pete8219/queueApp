const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Ticket = require("../models/tickets")
const Service = require("../models/services")

const { check, validationResult } = require("express-validator")

router.get("/", (req, res, next) => {
  Ticket.find({})
    .exec()
    .then((tickets) => {
      res.status(200).json({
        tickets,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

// Сохранение пользователя в базе. Проводятся проверки на запонение полей формы
router.post("/", [check("firstname", "Введите Ваше Имя").trim().toUpperCase().isLength({ min: 3 }), check("lastname", "Введите Вашу Фамилию").trim().toUpperCase().isLength({ min: 2 }), check("phone", "Введите номер телефона").not().isEmpty().trim(), check("phone", "Вы ввели некорректный номер. Длина номера должна быть от 5 до 11 знаков").isLength({ min: 5, max: 11 }), check("phone", "Номер телефона должен содержать только цифры").isNumeric()], async (req, res) => {
  const { date } = req.body
  const { surname } = req.body
  if (surname) {
    req.body.surname = surname.toUpperCase()
  }

  console.log(date)

  try {
    const errorFormatter = ({ msg }) => {
      return `${msg}`
    }
    const errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      })
    }

    const isExist = await Ticket.findOne({ date })

    if (isExist) {
      return res.status(400).json({
        message: "К сожалению, на данное время кто то только что записался",
      })
    }

    const ticket = new Ticket({ ...req.body })
    await ticket.save()
    res.status(201).json({
      message: "Ваша заявка принята",
    })
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    })
  }
})

// Достаем все талоны адресованные сотруднику

router.get("/lists/:userId", async (req, res) => {
  const id = req.params.userId
  console.log(id)
  try {
    const data = await Ticket.find({ user: req.params.userId })
    console.log(data)
    if (!data) {
      return res.status(404).json({
        message: "Ничего не найдено",
      })
    }

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      message: "Ошибка, попробуйте еще раз",
    })
  }
})

router.get("/:serviceId/:TicketDate", async (req, res) => {
  dateParam = req.params.TicketDate
  const start = new Date(req.params.TicketDate)
  start.setHours(start.getHours() + 5)
  start.toISOString()
  const end = new Date(dateParam)
  end.setHours(23, 59, 59, 0)
  end.setHours(end.getHours() + 5)

  end.toISOString()

  try {
    const data = await Ticket.find({ $and: [{ service: req.params.serviceId }, { date: { $gte: start, $lte: end } }] })
    res.status(200).json(data)
    console.log(data)
  } catch (e) {
    console.log(e)
    res.status(404).json({
      message: "Ничего не найдено",
    })
  }
})

router.patch("/:ticketId", (req, res, next) => {
  const id = req.params.ticketId

  const updateOps = {}

  for (ops of req.body) {
    updateOps[ops.propName] = ops.value
  }

  Ticket.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((ticket) => {
      res.status(200).json({
        message: "Updated ticket!",
        ticket,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete("/:ticketId", (req, res, next) => {
  res.status(200).json({
    message: "Ticket deleted",
  })
})

module.exports = router
