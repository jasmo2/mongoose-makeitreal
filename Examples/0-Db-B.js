const mongoose = require('mongoose')

const AnimalSchema = new mongoose.Schema({ type: String, subtype: String })

const kittySchema = new mongoose.Schema({
  animal: AnimalSchema,
  last: String,
  name: String,
  size: Number
})

class Kitten {
  // `fullName` becomes a virtual
  speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : "I don't have a name"
    console.log(greeting)
  }

  // `findByFullName()` becomes a static
  static findByFullName(name) {
    const firstSpace = name.indexOf(' ')
    const firstName = name.split(' ')[0]
    const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1)
    return this.findOne({ firstName, lastName })
  }
}

kittySchema.loadClass(Kitten)

module.exports = kittySchema
