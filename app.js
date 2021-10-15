const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const app = express()
//const Router = express.Router()

const morgan = require("morgan")
const mongoose = require("mongoose")
const errorMiddleware = require("./api/middleware/error-middleware")


const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 80

app.use(express.json({ extended: true }))

app.use(helmet())


async function start() {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  } catch (e) {
    console.log("Server Error", e.message)
    /* process.exit(1) */
  }
}

start()

app.use(function (req, res, next) {
  res.header("X-powered-by", "Electron App v.1")
  next()
})

app.use(morgan("dev"))
app.use(cors())



app.use("/auth", require("./api/routes/auth"))
app.use("/services", require("./api/routes/services"))
app.use("/categories", require("./api/routes/categories"))
app.use("/users", require("./api/routes/users"))
app.use("/tickets", require("./api/routes/tickets"))
app.use(errorMiddleware)



app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

module.exports = app
