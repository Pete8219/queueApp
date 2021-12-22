const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth.middleware");
const userRights = require("../middleware/userRights.middleware");
const StatementStatuses = require("../models/statementStatus");

router.get("/", auth, async (req, res) => {
  try {
    const result = await StatementStatuses.find({});

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

router.post("/create", auth, userRights, async (req, res) => {
  const { title } = req.body;
  try {
    const result = await StatementStatuses.create({ title });
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/delete/:id", auth, userRights, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await StatementStatuses.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Запись удалена",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
