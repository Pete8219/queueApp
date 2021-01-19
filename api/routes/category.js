const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Category = require('../models/category')


router.get("/", async(req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)

    } catch (e) {
        res.status(500).json({
            error: err
        })
    }
})

// Запись новой категории

router.post("/", async(req, res)=> {
    try {

        for (let key in req.body) {
            createOps[key] = req.body[key]
        }

        const category = await new Category({...createOps })
        await category.save()

        res.status(201).json({
            message: 'Новая категория создана'
        })

    } catch (e) {
        res.status(500).json({
            message: 'Непредвиденная ошибка, попробуйте снова'
        })
    }
})

//Обновление категории


//Удалении категории