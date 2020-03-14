/**
 * Con base a los datos guardados en Movies crear los siguientes metodos:
 * Crear un metodo que me haga la busqueda por ID
 *
 * Crear un metodo que me haga la busqueda por ranking
 * "menor o igual" a 10
 */

const Movies = require('./0-Db')

const id = 'tt0095327'

Movies.findOne({ id }, (err, movie) => {
  if (err) {
    console.error(err)
  }

  console.log('TCL: findOne => movie', movie)
})

const _id = '5e6ae0c561fc166a145815f6'
Movies.findById(_id, (err, movie) => {
  if (err) {
    console.error(err)
  }

  console.log('TCL: findById => movie', movie)
})

// -----

Movies.find({ rank: { $lte: 10 } }, (err, movies) => {
  if (err) {
    console.error(err)
  }

  const shortenMovies = movies.map(movie => ({
    title: movie.title,
    rank: movie.rank
  }))
  console.log('TCL: find => movies', shortenMovies)
})

// { rank: { $lte: 10, $mod: [2, 0] } },
Movies.find(
  { $and: [{ rank: { $lte: 10 } }, { rank: { $mod: [2, 0] } }] },

  (err, movies) => {
    if (err) {
      console.error(err)
    }

    const shortenMovies = movies.map(movie => ({
      title: movie.title,
      rank: movie.rank
    }))
    console.log('TCL: find => movies', shortenMovies)
  }
)
