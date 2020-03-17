/**
 * Consultar Documentos o listarlos
 */

const mongoose = require('mongoose')
const kittySchema = require('./0-Db-B')
const init = async () => {
  mongoose.connect('mongodb://localhost/cats', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const Kitten = mongoose.model('Kitten', kittySchema)

  const id = '5e5a9b4d1ba68d2c57bfefdd'

  try {
    // let kitten = await Kitten.findById(id)
    // kitten.name = 'Kual'
    // kitten = await kitten.save()
    // console.log('TCL: init -> Kitten.findById')
    // console.log('TCL: ANTES kitten', kitten)

    console.log('---------------------------')

    const kitten2 = await Kitten.updateMany(
      { name: 'Kual' }, // QUERY para mongoose
      { $set: { breed: 'home cats' } } //Elemento al que se va a reemplazar
    )
    console.log('TCL: init -> kitten2', kitten2)
  } catch (error) {
    console.error(error)
  }
}

init()
