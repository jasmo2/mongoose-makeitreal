/**
 * Insertar documentos.
 *
 */

const mongoose = require('mongoose')
const kittySchema = require('./0-Db-B')
const init = () => {
  mongoose.connect('mongodb://localhost/cats', {
    useUnifiedTopology: true
  })

  const Kitten = mongoose.model('Kitten', kittySchema)

  const fluffy = new Kitten({
    animal: { type: 'feline', subtype: 'cat' },
    last: 'molina',
    name: 'fluffy',
    size: 3
  })
  fluffy.save((err, fluffy) => {
    if (err) return console.error(err)
    console.log('Pre speak')
    fluffy.speak()
    console.log('Saved!')
  })

  Kitten.create({ name: 'kitty 2', last: 'torres' }, function(err) {
    if (err) return console.error(err)
  })
}

init()
