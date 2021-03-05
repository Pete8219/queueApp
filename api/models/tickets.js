const mongoose = require("mongoose")
const Service = require("./services")
const User = require("./users")

const ticketSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  time: String,
  firstname: String,
  lastname: String,
  surname: String,
  isBusy: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ["В работе", "Исполнено(проведена консультация)", "Исполнено(принято заявление)", "Исполнено(заявитель отказался подавать заяаление)", "Отказ от записи", "Не явился"],
    default: "В работе",
  },
  phone: String,
  email: String,
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
