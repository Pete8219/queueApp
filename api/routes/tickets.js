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
router.post("/", [check("firstname", "Введите фамилию").trim().toUpperCase().isLength({ min: 2 }), check("lastname", "Введите Имя").trim().toUpperCase().isLength({ min: 2 }), check("phone", "Введите номер телефона").not().isEmpty().trim(), check("phone", "Вы ввели некорректный номер. Длина номера должна быть от 5 до 11 знаков").isLength({ min: 5, max: 11 })/* , check("phone", "Номер телефона должен содержать только цифры").isNumeric() */], async (req, res) => {

  const { date, hours, minutes } = req.body
  /* const req.body.date = new Date(date.split('.').reverse().join('-'))
  const req.body.date.setHours(hours)
  const re.body */
  receptionDate = new Date(date.split('.').reverse().join('-'))
  receptionDate.setHours(hours)
  receptionDate.setHours(receptionDate.getHours() + 5)
  receptionDate.setMinutes(minutes)

  req.body.date = receptionDate

  const { surname } = req.body
  if (surname) {
    req.body.surname = surname.toUpperCase()
  }


  const query = {
    time: req.body.time,
    user: req.body.employee,
    date: req.body.date,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    surname: req.body.surname,
    phone: req.body.phone,
    service: req.body.serviceId
  }

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

    const isExist = await Ticket.findOne({ date: req.body.date })

    if (isExist) {
      return res.status(400).json({
        message: "К сожалению, на данное время только что записались"
      })
    }

    const ticket = new Ticket({ ...query })
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

//Выбор тикетов для пользователя за определенную дату

router.get("/:userId/:date", async(req, res) => {
  
  const startDate = new Date(req.params.date)
  startDate.toISOString()

  const endDate = new Date(req.params.date)

  endDate.setHours(23,59,0,0)


  try {
    const tickets = await Ticket.find({ $and : [{user: req.params.userId}, { date: {$gte : startDate, $lte: endDate} }]})
    res.status(200).json(tickets)
    } catch(e) {
    res.status(500).json({
      message:'Что то пошло не так'
    })
  }

})




//Выбор тикетов по id-услуги, за заданный промежуток времени. Используется при формировании времени приема 
router.get("/byService/:serviceId/:date", async(req, res) => {
  const { serviceId, date} = req.params

  console.log(serviceId, date)
  
  const startDate = new Date(req.params.date)
  startDate.toISOString()

  const endDate = new Date(req.params.date)

  endDate.setHours(23,59,0,0)

  console.log(startDate, endDate)


  try {
    const tickets = await Ticket.find({ $and : [{service: req.params.serviceId}, { date: {$gte : startDate, $lte: endDate} }]})
    console.log(tickets)
    res.status(200).json(tickets)
    } catch(e) {
    res.status(500).json({
      message:'Что то пошло не так'
    })
  }

})

//Поиск тикетов по фамилии посетителя



router.get('/find/:visitor', async (req, res) => {
  try {
    const data = await Ticket.find({firstname : req.params.visitor})

    res.status(200).json(data)

  } catch (e) {
    res.status(500).json({
      message: 'Что то пошло не так'
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


// Выбор тикетов в зависимости от статуса

router.get("/status", async (req, res) => {
  try {
    const statusData = await Ticket.find({})
    res.status(201).json(statusData.getStatus)
    console.log(statusData)
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    })
  }
})

//Удаление выбранного талона

router.delete("/:ticketId", (req, res, next) => {
  res.status(200).json({
    message: "Ticket deleted",
  })
})

module.exports = router
