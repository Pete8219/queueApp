const express = require("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")



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
      useFindAndModify: false,
    })
  } catch (e) {
    console.log("Server Error", e.message)
    /* process.exit(1) */
  }
}

start()

app.use(morgan("dev"))
app.use(cors())

app.use("/auth", require("./api/routes/auth"))
app.use("/services", require("./api/routes/services"))
app.use("/categories", require("./api/routes/categories"))
app.use("/users", require("./api/routes/users"))
app.use("/tickets", require("./api/routes/tickets"))


app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

module.exports = app
