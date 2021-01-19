const mongoose = require("mongoose")
const User = require("./users")
const Category = require("./category")

const serviceSchema = mongoose.Schema({
  title: String,
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: String },
})

module.exports = mongoose.model("Service", serviceSchema)
