const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("Category", categorySchema)
