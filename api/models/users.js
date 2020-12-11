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
    },
    service: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Service'}
    ]

})

module.exports = mongoose.model("User", userSchema)