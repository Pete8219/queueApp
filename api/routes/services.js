/* const { json } = require("body-parser") */
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Service = require("../models/services")
const User = require("../models/users")

//Получение списка услуг
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({})
    res.status(200).json(services)
  } catch (e) {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  }
})

router.get("/new", (req, res, next) => {
  //Нам нужно получить список users, чтобы отобразить на форме добавления список select со значениями из коллекции users
  User.find({}, { password: 0, userType: 0, login: 0, start: 0, end: 0, cabinet: 0 })
    .exec()
    .then((users) => {
      res.status(200).json({
        message: "Здесь будет форма добавления новой услуги",
        users,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

//Редактирование выбранной услуги

/* router.post('/detail/:id', async (req, res) => {
  const id = req.params.serviceId
  console.log(id)

  try {
    const service = await Service.findById( {id} )
    res.status(200).json(service)


  } catch (e){
    res.status(500).json({
      message: 'Somthing wrong'
    })
  }
 */

/* Service.findOne({ _id: id})
  .exec()
  .then(service => {
    res.status(201).json({
      message: `Edit service with id = ${id}`,
      service
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  }) */
/*})*/

//Запись услуги в базу данных
router.post("/", (req, res) => {
  const service = new Service({
    title: req.body.title,
    user: mongoose.Types.ObjectId,
    time: req.body.time,
  })
  service
    .save()
    .then((data) => {
      res.status(201).json({
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

//Получение выбранной по ID услуги
router.get("/:id", async (req, res) => {
  console.log(req.params.id)

  const id = req.params.id
  const data = await Service.findOne({ _id: id })
    .populate("user")
    .exec(function (err, service) {
      User.find({ _id: { $nin: service } }, { password: 0, login: 0 }, function (err, users) {
        res.status(200).json({
          service: service,
          users: users,
        })
      })
    })
})

//Send POST request to render tickets page

router.post("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  res.status(200).json({
    message: `Handle request param serviceId ${id}`,
  })
})

router.patch("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  const updateOps = {}

  for (ops of req.body) {
    updateOps[ops.propName] = ops.value
  }

  Service.updateOne({ _id: id }, { $set: updateOps })
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

//Удаление выбранной услуги
router.delete("/:serviceId", (req, res, next) => {
  res.status(200).json({
    message: "Service deleted",
  })
})

module.exports = router
