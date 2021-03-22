

const mongoose = require('mongoose')

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const URL = process.env.MONGODB_URI

const url = `${URL}`
mongoose.connect(url)

const Reminder = mongoose.model('Reminder', {
    name: String,
    timestamp: Date,
})

module.exports = Reminder


