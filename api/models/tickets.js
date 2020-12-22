const mongoose = require("mongoose")
const Service = require("./services")
const User = require("./users")

const ticketSchema = mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  visitor: {
    type: String,
    required: true,
  },
  isBusy: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ["work", "worked", "tel_consult", "not_enough_docs"],
    default: "work",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
})

ticketSchema.virtual("getStatus").get(function () {
  return ticketSchema.path("status").options.enum
})

module.exports = mongoose.model("Ticket", ticketSchema)
