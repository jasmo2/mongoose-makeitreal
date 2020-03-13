const { Schema } = require('mongoose')
const MoviesSchema = new Schema({
  id: String,
  rank: Number,
  title: String
})

module.exports = MoviesSchema
