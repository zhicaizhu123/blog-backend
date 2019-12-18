const mongoose = require('mongoose')
const { Schema, model } = mongoose

const LifeTypeScheme = new Schema({
  __v: { type: Number, select: false },
  label: { type: String, require: true }
})

module.exports = model('LifeType', LifeTypeScheme)
