const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    employee: mongoose.Schema.Types.ObjectId,
    time: String 

})

module.exports = mongoose.model('Service', serviceSchema)