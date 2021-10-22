const express = require('express')
const router = express.Router() 
const mongoose = require("mongoose")
const auth = require('../../middleware/auth.middleware')
const User = require('../../models/users')

router.get("/:id", auth, async(req, res) => {

 

    try {
        const data = await User.findOne({ _id: req.params.id}).select('-password -login -userType -online -start -end')


        //Блок проверки в отпуске сотрудник или нет

        isVacation = false

        const { vacationFrom: from, vacationTo: to, substitute: s } = data
        
        if(from !==null && to!==null && s) {
            const date = Date.now()
            if( date>= from.getTime() && date <= to.getTime()) {
                data._id = s
                isVacation = true
            }
        }

        if(isVacation) {
            const user = await User.findOne({ _id: s})
            data.name = user.name
            data.cabinet = user.cabinet


        }


        res.status(200).json(data)
    } catch (e) {
        res.status(400).json({
            message: 'Пользователь не найден'
        })
    }

})
module.exports = router