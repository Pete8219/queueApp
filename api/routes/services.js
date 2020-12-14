const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
<<<<<<< HEAD
=======

>>>>>>> 2a1bcb2a5402822ce6588dd8596efdf91dd56499

const Service = require("../models/services")
const User = require("../models/users")



//Получение списка услуг
router.get("/", (req, res, next) => {
  Service.find({})
    .exec()
    .then((data) => {
      res.render("show", {data})
      
      /* res.status(200).json({
        message: "Handling GET request to /services",
        data,
      }) */
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})



router.get('/new', (req, res, next) => {
  //Нам нужно получить список users, чтобы отобразить на форме добавления список select со значениями из коллекции users
  User.find({}, {password: 0, userType: 0, login: 0, start: 0, end: 0, cabinet: 0})
  .exec()
  .then(users => {
    res.status(200).json({
      message: 'Здесь будет форма добавления новой услуги',
      users
    })
  })
  .catch(err => {
    console.log(err)
    })

})

//Редактирование выбранной услуги

router.post('/:serviceId/edit', (req, res, next) => {
  const id = req.params.serviceId
  Service.findOne({ _id: id})
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
  })
})



//Запись услуги в базу данных
router.post("/", (req, res, next) => {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
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
router.get("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  Service.findOne({ _id: id })
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

<<<<<<< HEAD
//Send POST request to render tickets page

router.post("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  res.status(200).json({
    message: `Handle request param serviceId ${id}`,
  })
})

=======
//Update выбранной услуги
>>>>>>> 2a1bcb2a5402822ce6588dd8596efdf91dd56499
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
