const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    cabinet: Number,
    start: String,
    end: String,
    userType: {
        type: String,
        enum: ['superAdmin', 'admin', 'user'],
        default: 'user'
    }

})

module.exports = mongoose.model("User", userSchema)