const mongoose = require("mongoose")
const Service = require("./services")
const User = require("./users")

const ticketSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  /* time: String, */
  firstname: String,
  lastname: String,
  surname: String,
  isBusy: { type: Boolean, default: true },
  status: {
    type: String,
    default: "pending"
  },
  phone: String,
  email: String,
  note: String,
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  serviceType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

/* ticketSchema.virtual("getStatus").get(function () {
  return ticketSchema.path("status").options.enum
}) */

module.exports = mongoose.model("Ticket", ticketSchema)
