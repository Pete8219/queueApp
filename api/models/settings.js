const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  startOfReception: {
    type: String,
    required: true,
  },
  endOfReception: {
    type: String,
    required: true,
  },
  typeOfService: [{ title: String, duration: String }],
});

module.exports = mongoose.model("Setting", settingSchema);
