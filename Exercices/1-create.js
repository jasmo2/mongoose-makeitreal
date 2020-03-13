/**
 *
 * Insertar de forma multiple las peliculas que aparecen aquí.
 * Y verifivar si se guardaron de forma correcta.
 *
 */
const Movies = require('./0-Db')
const moviesJson = require('./1-movies.json')
console.log('TCL: moviesJson', moviesJson)

Movies.insertMany(moviesJson, (err, doc) => {
  if (err) {
    console.err('err', err)
  }
  console.log('doc', doc)
})
