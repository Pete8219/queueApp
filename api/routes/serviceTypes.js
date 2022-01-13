const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth.middleware");
const userRights = require("../middleware/userRights.middleware");
const ServiceTypes = require("../models/serviceTypes");

router.get("/", auth, async (req, res) => {
  try {
    const types = await ServiceTypes.find({});

    return res.status(200).json(types);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/create", auth, userRights, async (req, res) => {
  try {
    const data = await ServiceTypes.create({ ...req.body });
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/edit/:id", auth, userRights, async (req, res) => {
  const { id } = req.params;
  const { title, duration } = req.body;

  try {
    const result = await ServiceTypes.findOneAndUpdate(
      { _id: id },
      { $set: { title, duration } },
      { new: true }
    );
    return res.status(200).json({
      result,
      message: "Данные успешно обновлены",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

router.delete("/delete/:id", auth, userRights, async (req, res) => {
  try {
    const result = await ServiceTypes.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      message: "Данные удалены",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

module.exports = router;
