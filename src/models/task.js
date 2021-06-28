const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    Request: {
        type: String,
        required: true
    },
    User: {
        type: String
    },
    Dev: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema);