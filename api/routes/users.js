const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const User = require("../models/users");
const UserDto = require("../dto/userDto");
const ManagerDto = require("../dto/managerDto");
//Получение списка всех пользователей
//Здесь нужно сделать проверку авторизации!!!!
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({}).select({
      password: 0,
      userType: 0,
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({
      message: "Что то пошло не так как надо",
    });
  }
});

router.get("/managers/list", auth, async (req, res) => {
  try {
    const users = await User.find({ userType: "manager" });
    console.log(users);
    /*     if (!manager) {
      res.status(400).json({
        message: "Данные не найдены",
      });
    } */

    const managers = users.map((user) => {
      const managerDto = new ManagerDto(user);
      return managerDto;
    });

    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

//Сохранения нового пользователя в базе

router.post("/create", auth, async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
    const createOps = {};

    for (let key in req.body) {
      //пробегаемся по всем значениям объекта и формируем новый объект
      createOps[key] = req.body[key];
    }
    const user = new User({ ...createOps });
    await user.save();

    res.status(201).json({
      user,
      message: "Пользователь успешно создан",
    });
  } catch (e) {
    res.status(500).json({
      message: "операция не выполнена, попробуйте еще раз",
    });
  }
});

//Получения одного пользователя по userId
//Здесь нужно сделать проверку авторизации!!!!
router.get("/:id", auth, async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });

    return res.status(200).json({
      data,
      roles: data.getRoles,
    });

    /*  res.status(200).json(user) */
  } catch (e) {
    res.status(400).json({
      message: "Пользователь не найден",
    });
  }
});

router.get("/profile/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(400).json({
        message: "Нет такого пользователя",
      });
    }

    const userDto = new UserDto(user);
    res.status(200).json({ ...userDto });
  } catch (error) {
    res.status(500).json({
      message: "Внутренняя ошибка сервера",
    });
  }
});

//Получение имени пользователя для отображения на странице приветствия
//Здесь нужно сделать проверку авторизации!!!!

router.get("/welcome/:id", auth, async (req, res) => {
  try {
    const username = await User.findOne({ _id: req.params.id }).select([
      "name",
      "cabinet",
    ]);
    res.status(201).json(username);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка запроса, попробуйте позже",
    });
  }
});

router.get("/substitute/:userId/:date", auth, async (req, res) => {
  currentDate = new Date(req.params.date).toISOString();

  try {
    const data = await User.find({ _id: req.params.userId });
    if (!data.length) {
      return res.status(404).json({
        message: "Нет записей",
      });
    }

    if (data[0].substitute === null) {
      return res.status(404).json({
        message: "нет заменяющего сотрудника",
      });
    }

    const start = Date.parse(data[0].vacationFrom);
    const end = Date.parse(data[0].vacationTo);

    if (Date.parse(currentDate) >= start && Date.parse(currentDate) <= end) {
      const subUser = data[0].substitute;
      res.status(200).json(subUser);
    }
  } catch (e) {
    res.status(500).json({
      message: "Что то пошло не так",
    });
  }
});

//Обновление пользовательских полей
//Здесь нужно сделать проверку авторизации!!!!
router.patch("/:id", auth, async (req, res) => {
  try {
    const data = await User.findById({ _id: req.params.id });
    const userPassword = data.password;

    if (req.body.password == "" || req.body.password === undefined) {
      //Если пароль не меняли записываем пароль из базы
      req.body.password = userPassword;
    } else {
      // Иначе хэшируем новый пароль и записываем его в тело запроса

      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashedPassword;
    }

    if (req.body.substitute === "") {
      req.body.substitute = null;
    }

    const updateOps = {};

    for (let key in req.body) {
      //пробегаемся по всем значениям объекта запроса и формируем новый объект
      updateOps[key] = req.body[key];
    }

    await User.updateOne({ _id: req.params.id }, { $set: updateOps });
    res.status(200).json({
      message: "Данные пользователя обновлены",
    });
  } catch (e) {
    res.status(400).json({
      message: "something wrong",
    });
  }
});

//Удаление выбранного пользователя
//Здесь нужно сделать проверку авторизации!!!!
router.delete("/:id", auth, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Пользователь успешно удален",
    });
  } catch (e) {
    res.status(400).json({
      message: "Что то пошло не так. Попробуйте еще раз",
    });
  }
});

module.exports = router;
