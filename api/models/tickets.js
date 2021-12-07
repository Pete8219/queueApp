const mongoose = require("mongoose");
const Service = require("./services");
const User = require("./users");

const ticketSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  firstname: String,
  lastname: String,
  surname: String,
  isBusy: { type: Boolean, default: true },
  status: {
    type: String,
    default: "pending",
  },
  phone: String,
  email: String,
  note: { type: String, default: "" },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  serviceType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
