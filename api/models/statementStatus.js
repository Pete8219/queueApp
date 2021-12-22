const mongoose = require("mongoose");

const statusesSchema = new mongoose.Schema({
  title: { type: String },
});

module.exports = mongoose.model("StatementStatuses", statusesSchema);
