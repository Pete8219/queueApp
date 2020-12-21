/* const { json } = require("body-parser") */
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Service = require("../models/services")
const User = require("../models/users")
const {check, validationResult} = require("express-validator") 

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
router.post("/", [check('title', 'Поле не должно быть пустым').not().isEmpty().trim().escape()], async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty) {
      res.status(400).json({
        errors: errors.array(),
        message: 'Проверьте введенные данные'
      })
    }

    const {title} = req.body
      
    const isExist = await Service.findOne( {title})
    if(isExist) {
      return res.status(400).json({
        message: 'Такая услуга уже есть в базе'
      })
    } 

    const service = await new Service( {title: req.body.title, time: req.body.time, user: req.body.user})

    await service.save()

    res.status(201).json({
      message: 'Услуга создана'
    })

  } catch (e) {
    res.status(500).json({
      message: 'Нередвиденная ошибка, попробуйте еще раз'
    })
  }

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
router.delete("/:id", async (req, res) => {
  try {
    await Service.deleteOne({ _id: req.params.id})
      res.status(200).json({
      message: "Услуга удалена",
    })

  } catch (e) {
    res.status(400).json({
      message: 'Что то пошло не так'
    })
  }
 
})

module.exports = router
