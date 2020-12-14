const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Service = require("../models/services")
const User = require("../models/users")

router.get("/", (req, res, next) => {
  Service.find({})
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Handling GET request to /services",
        data,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.post("/", (req, res, next) => {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    user: new mongoose.Types.ObjectId(),
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

//Send POST request to render tickets page

router.post("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  res.status(200).json({
    message: `Handle request param serviceId ${id}`,
  })
})

router.patch("/:serviceId", (req, res, next) => {
  res.status(200).json({
    message: "Updated service!",
  })
})

router.delete("/:serviceId", (req, res, next) => {
  res.status(200).json({
    message: "Service deleted",
  })
})

module.exports = router
