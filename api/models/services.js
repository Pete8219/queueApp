const mongoose = require("mongoose")
const User = require("./users")

const serviceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: String },
})

module.exports = mongoose.model("Service", serviceSchema)
