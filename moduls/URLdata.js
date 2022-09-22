const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLSchema = new Schema({
  inputURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('URLdata', URLSchema)