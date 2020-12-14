const express = require("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require('path')

const dotenv = require("dotenv")
dotenv.config()

const Router = express.Router()

app.use("/auth", require("./api/routes/auth"))

/* const serviceRoutes = require("./api/routes/services")
const usersRoutes = require("./api/routes/users")
const ticketsRoutes = require("./api/routes/tickets") */

mongoose.connect(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/services", require("./api/routes/services"))
app.use("/users", require("./api/routes/users"))
app.use("/tickets", require("./api/routes/tickets"))

app.use(express.static(path.join(__dirname, "client")))

app.set("views", "./client/views/")
app.set("view engine", "ejs")

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
