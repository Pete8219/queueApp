const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  
  login: {
    type: String,
    /* required: true, */
  },
  password: {
    type: String,
    /* required: true, */
  },
  name: String,
  cabinet: Number,
  start: String,
  end: String,
  userType: {
    type: String,
    enum: ["superAdmin", "admin", "user"],
    default: "user",
  },
  vacationFrom: {
    type: Date,
    default: ''
  },
  vacationTo: {
    type: Date,
    default: ''
  },
  substitute:{ 
    type:mongoose.Schema.Types.ObjectId,
    default: null
  },
  online: {
    type: Boolean,
    default: true
  }

})

userSchema.virtual("getRoles").get(function () {
  return userSchema.path("userType").options.enum
})

module.exports = mongoose.model("User", userSchema)
