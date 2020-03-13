/**
 * Consultar Documentos o listarlos
 */

const mongoose = require('mongoose')
const kittySchema = require('./0-Db-B')
const init = () => {
  console.log('List')
  mongoose.connect('mongodb://localhost/cats', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const Kitten = mongoose.model('Kitten', kittySchema)

  const _id = '5e5a9b4d1ba68d2c57bfefdd'
  // Kitten.findById(_id, function(err, kitten) {
  //   if (err) return console.error(err)
  //   console.log('TCL: init -> Kitten.findById')
  //   console.log('TCL: kitten', kitten)
  // })

  // Kitten.find(
  //   { name: { $regex: 'kitty *', $options: 'i' } },
  //   (err, kitties) => {
  //     if (err) return console.error(err)
  //     console.log('---------------------------')
  //     console.log('TCL: init -> Kitten.find NAME')
  //     console.log(kitties)
  //   }
  // )

  //Kitten.find({ _id: _id })
  Kitten.find({ _id }, (err, kitten) => {
    console.log('TCL: init -> kitten', kitten)
    if (err) {
      console.error(err)
    }
  })
}

init()
