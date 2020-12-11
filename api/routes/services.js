const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Service = require("../models/services")

router.get("/", (req, res, next) => {
  let services = Service.find({})
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Handling GET request to /services",
        services: data,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post("/", (req, res, next) => {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    employee: new mongoose.Types.ObjectId(),
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
        error: err
      })
    })
})

router.get("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  const service = Service.findOne({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json({
        service: data,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  res.status(200).json({
    message: `now you see POST request serviceId:${id}`,
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
