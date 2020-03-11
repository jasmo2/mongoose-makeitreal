/**
 * Eliminar registros
 *
 */

const mongoose = require('mongoose')
const kittySchema = require('./0-Db-B')
const init = async () => {
  mongoose.connect('mongodb://localhost/cats', {
    useUnifiedTopology: true
  })

  const Kitten = mongoose.model('Kitten', kittySchema)

  const id = '5e515f8126e918d59d7dfd12'
  let kitten = await Kitten.findById(id)
  await kitten.remove()
  console.log('TCL: init -> Kitten.has been removed!')

  console.log('---------------------------')

  const kitten2 = await Kitten.deleteOne({ name: 'Nombre nuevo' })
  console.log('TCL: init -> "Nombre nuevo" fué eleminado de la DB')
}

init()
