const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth.middleware");
const Service = require("../models/services");
const User = require("../models/users");
const { body, validationResult } = require("express-validator");

//Получение списка услуг
router.get("/", auth, async (req, res) => {
  try {
    const services = await Service.find({});

    res.status(200).json(services);
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

//Запись услуги в базу данных
//Здесь нужно сделать проверку авторизации!!!!
router.post(
  "/create",
  auth,
  body("title")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Вы не заполнили название услуги"),
  body("user").not().isEmpty().withMessage("Выберите пользователя/-лей"),
  body("category").not().isEmpty().withMessage("Укажите категорию"),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { title, user } = req.body;

      const isExist = await Service.findOne({ $and: [{ title }, { user }] });

      if (isExist) {
        return res.status(400).json({
          errors: [{ msg: "Такая услуга уже есть в базе" }],
        });
      }

      const service = new Service({
        title: req.body.title,
        time: req.body.time,
        user: req.body.user,
        category: req.body.category,
      });

      await service.save();

      res.status(201).json({
        message: "Услуга создана",
        service,
      });
    } catch (e) {
      res.status(500).json({
        message: "Нередвиденная ошибка, попробуйте еще раз",
      });
    }
  }
);

router.get("/info/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Service.findOne({ _id: id }).populate("user", [
      "name",
      "cabinet",
      "start",
      "end",
    ]);

    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    });
  }
});

router.get("/getTitle/:id", auth, async (req, res) => {
  try {
    const data = await Service.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка выполнение запроса",
    });
  }
});

//Получение списка услуг принадлежащих сотруднику
//Здесь нужно сделать проверку авторизации!!!!

router.get("/byUser/:userId", auth, async (req, res) => {
  try {
    const data = await Service.find({ user: req.params.userId });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка запроса, попробуйте позже",
    });
  }
});

//Получение услуг по выбранной категории
router.get("/byCategory/:categoryId", auth, async (req, res) => {
  try {
    const data = await Service.find({ category: req.params.categoryId });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка запроса, попробуйте еще раз",
    });
  }
});

//Новый  api по получению выбранной услуги

router.get("/:id", auth, async (req, res) => {
  try {
    const data = await Service.findOne({ _id: req.params.id })
      .populate("user", ["-login", "-password", "-userType"])
      .populate("category")
      .exec();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    });
  }
});

//Обновление информации об услуге
//Здесь нужно сделать проверку авторизации!!!!

router.patch("/:id", auth, async (req, res) => {
  try {
    const updateOps = {};
    for (key in req.body) {
      updateOps[key] = req.body[key];
    }

    await Service.updateOne({ _id: req.params.id }, { $set: updateOps });
    res.status(200).json({
      message: "Данные успешно обновлены",
    });
  } catch (e) {
    res.status(500).json({
      message: "Что то пошло не так",
    });
  }
});

//Удаление выбранной услуги
//Здесь нужно сделать проверку авторизации!!!!
router.delete("/:id", auth, async (req, res) => {
  try {
    await Service.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Услуга удалена",
    });
  } catch (e) {
    res.status(400).json({
      message: "Что то пошло не так",
    });
  }
});

module.exports = router;
