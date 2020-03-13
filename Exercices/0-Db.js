/**
 * Creemos una DB "Movies", la cual contenga su propio esquema Movies
 *
 * 1) Crea un nuevo Schema con Mongoose con movies .
 *   Elija qué campos debe tener la película,
 *   En este caso: "Raking", "Nombre", "ID-externo"
 *   Puede ser tantos o como cualquiera. (No necesita usar la base de datos IMDB).
 *
 * 2) Luego cree un Model basado en este programa.
 *
 *
 * Explicación:
 * Usualmente los archivos de configuración de La DB y el programam
 * que ejecuta el programa, se encuentran en archivos separados.
 *
 * Aun así para este ejercicio los haremos en el mismo archivo en modo de aprendizaje.
 *
 * Si lo pueden separar será un plus!
 **/

const MoviesSchema = require('./0-DbSchema')
const { connection, connect, model } = require('mongoose')
require('dotenv').config()

const uri = `mongodb+srv://jasmo2:${process.env.DB_TOKEN}@cluster0-2culb.mongodb.net/movies?retryWrites=true&w=majority`

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

connection.on('error', console.error.bind(console, 'connection error:'))

connection.once('open', function(params) {
  console.log('Connected -> DB', params, uri)
})

const Movies = model('Movies', MoviesSchema)

module.exports = Movies
