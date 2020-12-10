const express = require('express')
const router = express.Router()



router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Request GET to /tickets'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST request to /tickets'
    })
})

router.get('/:ticketId', (req, res, next) => {
    const id = req.params.ticketId
    res.status(200).json({
        message: `Handling ID from request ticketId: ${id}`
    })
})


router.patch('/:ticketId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated ticket!'
    })
})


router.delete('/:ticketId', (req, res, next) => {
    res.status(200).json({
        message: 'Ticket deleted'
    })
})


module.exports = router