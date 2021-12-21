const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  cabinet: Number,
  start: String,
  end: String,
  email: String,
  phone: String,
  userType: {
    type: String,
    enum: ["superAdmin", "admin", "manager", "user"],
    default: "user",
  },
  vacationFrom: {
    type: Date,
    default: "",
  },
  vacationTo: {
    type: Date,
    default: "",
  },
  substitute: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  online: {
    type: Boolean,
    default: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
});

userSchema.virtual("getRoles").get(function () {
  return userSchema.path("userType").options.enum;
});

module.exports = mongoose.model("User", userSchema);
