const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth.middleware");
const Category = require("../models/categories");

router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories.length) {
      return res.status(404).json({
        message: "Ничего не найдено",
      });
    }
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    });
  }
});

// Запись новой категории
//Здесь нужно сделать проверку авторизации!!!!

router.post("/create", auth, async (req, res) => {
  try {
    const category = new Category({ title: req.body.data });
    await category.save();

    res.status(201).json(category);
  } catch (e) {
    res.status(500).json({
      message: "Непредвиденная ошибка, попробуйте снова",
    });
  }
});

//Получение категории по id
//Здесь нужно сделать проверку авторизации!!!! ???

router.get("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({
        message: "Почему такая категория не найдена",
      });
    }

    res.status(201).json(category);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка получения данных",
    });
  }
});

//Обновление категории
//Здесь нужно сделать проверку авторизации!!!!

router.patch("/:id", auth, async (req, res) => {
  try {
    await Category.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    const data = await Category.findOne({ _id: req.params.id });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: "Не удалось обновить",
    });
  }
});

//Удалении категории
//Здесь нужно сделать проверку авторизации!!!!

router.delete("/:id", auth, async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Запись успешно удалена",
    });
  } catch (e) {
    res.status(500).json({
      message: "Произошла ошибка при удалении",
    });
  }
});

module.exports = router;
