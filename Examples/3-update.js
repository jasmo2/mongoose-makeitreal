/**
 * Consultar Documentos o listarlos
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
  kitten.name = 'Kual'
  kitten = await kitten.save()
  console.log('TCL: init -> Kitten.findById')
  console.log('TCL: ANTES kitten', kitten)

  console.log('---------------------------')

  const kitten2 = await Kitten.update(
    { name: 'kitty 2' },
    { name: 'Nombre nuevo' }
  )
  console.log('TCL: init -> kitten2', kitten2)
}

init()
