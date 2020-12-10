const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const Router = express.Router()



const serviceRoutes = require('./api/routes/services')
const usersRoutes = require('./api/routes/users')
const ticketsRoutes = require('./api/routes/tickets')

mongoose.connect(process.env.CONNECTIONSTRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/services', serviceRoutes)
app.use('/users', usersRoutes)
app.use('/tickets', ticketsRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app