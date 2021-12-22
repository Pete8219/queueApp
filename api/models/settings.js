const mongoose = require("mongoose");
const ServiceTypes = require("./serviceTypes");
const StatementStatuses = require("./statementStatus");

const settingSchema = new mongoose.Schema({
  shedule: {
    type: Map,
    of: String,
  },
  serviceTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceTypes",
    },
  ],
  receptionDays: [],
  statementStatuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StatementStatuses",
    },
  ],
});

module.exports = mongoose.model("Setting", settingSchema);
