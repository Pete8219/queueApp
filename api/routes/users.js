const express = require('express')
const app = require('../../app')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/users')


router.get('/', (req, res, next) =>{

    const users = User.find({})
    .exec()
    .then(data => {
        if (data.length > 0) {
            res.status(200).json({
                message:'Fetched all users from collection users',
                users: data
            })
        } else {
            res.status(404).json({
                message: 'No entries found'
            })
        }
       
    })
    .catch(err => {
        console.log(err)
    })
    
})

router.post('/', (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        cabinet: req.body.cabinet,
        start: req.body.start,
        end: req.body.end,
        userType: req.body.userType
    })

    user.save()
    .then(data => {
        res.status(201).json({
            message: 'User was created',
            result: data
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

    
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId

    const user = User.find({ _id: id})
    .exec()
    .then(data => {
        res.status(200).json({
            message: `Handling GET request to fetch userID: ${id}`,
            user: data
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    
})


/* router.post('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: `Handling POST request to fetch userID: ${id}`
    })
}) */

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId

    const updateOps = {}

    for (ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    User.update({ _id : id}, { $set : updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

   
})


router.delete('/:userId', (req, res, next) => {

    const id = req.params.userId
    User.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json(result)

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})




module.exports = router