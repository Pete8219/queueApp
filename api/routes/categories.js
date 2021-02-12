const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Category = require('../models/categories')


router.get("/", async(req, res) => {
    try {
        const categories = await Category.find({})

        if(!categories.length) {
            return res.status(404).json({
                message: "Ничего не найдено"
            })

            
        }
        res.status(200).json(categories)

    } catch (e) {
        res.status(500).json({
            message: "Что то не так"
        })
    }
})

// Запись новой категории
//Здесь нужно сделать проверку авторизации!!!!

router.post("/", async(req, res)=> {
    console.log(req.body)
    try {

       

        const category = await new Category({ title: req.body.title })
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

//Получение категории по id
//Здесь нужно сделать проверку авторизации!!!! ???

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id})
        if(!category) {
            return res.status(404).json({
               message: 'Почему такая категория не найдена' 
            })

        }

        res.status(201).json(category)

    } catch (e) {
        res.status(500).json({
            message: 'Ошибка получения данных'
        })
    }
})

//Обновление категории
//Здесь нужно сделать проверку авторизации!!!!

router.patch('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id}
        const update = { title: req.body.title}

        const data = await Category.findOneAndUpdate(filter, update)

        res.status(200).json({
            message: 'Данные обновлены'
        })

    } catch(e) {
        res.status(500).json({
            message: 'Не удалось обновить'
        })
    }
})


//Удалении категории
//Здесь нужно сделать проверку авторизации!!!!

router.delete("/:id", async(req, res) => {
    try {
        await Category.deleteOne({ _id : req.params.id})
        res.status(200).json ({
             message: 'Запись успешно удалена'   
        })

    } catch(e) {
        res.status(500).json({
            message: 'Произошла ошибка при удалении'
        })
    }
})


module.exports = router