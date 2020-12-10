const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Service = require("../models/services")

router.get("/", (req, res, next) => {
  const services = Service.find({})
    .exec()
    .then((data) => {
      console.log(data)
      res.status(200).json({
        message: "Handling GET request to /services",
        services: data,
      })
    })
    .catch((err) => console.log(err))
})

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST request to /services",
  })
})

router.get("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId
  res.status(200).json({
    message: `now you see serviceId:${id}`,
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
