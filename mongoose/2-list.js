/**
 * Consultar Documentos o listarlos
 */

const mongoose = require('mongoose')
const kittySchema = require('./0-Db-B')
const init = () => {
  mongoose.connect('mongodb://localhost/cats', {
    useUnifiedTopology: true
  })

  const Kitten = mongoose.model('Kitten', kittySchema)

  const id = '5e515f8126e918d59d7dfd12'
  Kitten.findById(id, function(err, kitten) {
    if (err) return console.error(err)
    console.log('TCL: init -> Kitten.findById')
    console.log('TCL: kitten', kitten)
  })

  Kitten.find({ name: { $regex: 'kitty *', $options: 'i' } }, function(
    err,
    kitties
  ) {
    if (err) return console.error(err)
    console.log('---------------------------')
    console.log('TCL: init -> Kitten.find NAME')
    console.log(kitties)
  })
}

init()
