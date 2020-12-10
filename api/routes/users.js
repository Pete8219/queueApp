const express = require('express')
const app = require('../../app')
const router = express.Router()


router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET request to users'
    })
})

router.post('/', (req, res, next) => {

    const user = {
        name: req.body.name,
        age: req.body.age
    }
    res.status(201).json({
        message: 'Handling POST request to users',
        createdUser: user
    })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: `Handling GET request to fetch userID: ${id}`
    })
})


router.post('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: `Handling POST request to fetch userID: ${id}`
    })
})

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated user!'
    })
})


router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User deleted'
    })
})




module.exports = router