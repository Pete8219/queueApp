const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth.middleware");
const userRights = require("../middleware/userRights.middleware");
const Settings = require("../models/settings");

//Получение всех настроек приложения
router.get("/", auth, userRights, async (req, res) => {
  try {
    const settings = await Settings.find({});
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

// Создание или обновление записей в зависимости от наличия или отсутствия настроек в базе

router.post("/create", auth, userRights, async (req, res) => {
  try {
    const setting = await Settings.find({});

    if (!setting.length) {
      // Если в базе еще нет настроек приложения создаем их
      const result = await Settings.create({ ...req.body });
      return res.status(201).json(result);
    }

    // если есть , то просто обновляем их
    const result = await Settings.findOneAndUpdate(
      { _id: setting[0]._id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    return res.status(200).json([result]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Сброс всех настроек приложения
router.delete("/clear", auth, userRights, async (req, res) => {
  try {
    const result = await Settings.remove({});
    return res.status(200).json({
      message: "Настройки сброшены",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

module.exports = router;
