const mongoose = require("mongoose");

const serviceTypesSchema = new mongoose.Schema({
  title: String,
  duration: String,
});

module.exports = mongoose.model("ServiceTypes", serviceTypesSchema);
