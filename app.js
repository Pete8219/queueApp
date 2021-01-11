const express = require("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
/* const bodyParser = require("body-parser") */
const mongoose = require("mongoose")
/* const path = require('path') */

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 80

app.use(express.json({ extended: true }))
const Router = express.Router()

async function start() {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (e) {
    console.log("Server Error", e.message)
    /* process.exit(1) */
  }
}

start()

app.use(morgan("dev"))
/* app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) */
app.use(cors())

app.use("/auth", require("./api/routes/auth"))
app.use("/services", require("./api/routes/services"))
app.use("/users", require("./api/routes/users"))
app.use("/tickets", require("./api/routes/tickets"))

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

module.exports = app
