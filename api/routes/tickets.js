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
router.post("/", [check("firstname", "Введите Ваше Имя").trim().isLength({ min: 3 }), check("lastname", "Введите Вашу Фамилию").trim().isLength({ min: 2 }), check("phone", "Введите номер телефона").trim().isLength({ min: 5 })], async (req, res) => {
  const { date } = req.body

  console.log(date)

  try {
    const errorFormatter = ({ location, msg, param, value }) => {
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
  /*   const ticket = new Ticket({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    visitor: req.body.visitor,
    service: new mongoose.Types.ObjectId(),
    user: new mongoose.Types.ObjectId(),
    status: req.body.status,
  })

  ticket
    .save()
    .then((ticket) => {
      res.status(200).json({
        message: "POST request to /tickets",
        ticket: ticket,
      })
    })
    .catch((err) => {
      console.log(err)
    }) */
})

/* router.get("/:ticketId", (req, res, next) => {
  const id = req.params.ticketId
  Ticket.find({ _id: id })
    .exec()
    .then((ticket) => {
      res.status(200).json({
        message: `Handling ID from request ticketId: ${id}`,
        ticket: ticket,
        status: ticket[0].getStatus,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}) */

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
