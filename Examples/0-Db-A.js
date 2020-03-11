// getting-started.js
const mongoose = require('mongoose')
const kittySchema = require('./0-Db-B')
const init = () => {
  mongoose.connect('mongodb://localhost/cats', {
    useUnifiedTopology: true
  })

  const Kitten = mongoose.model('Kitten', kittySchema)
}

init()
