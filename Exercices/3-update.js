const additionalText = ' - ultimas 50'

const Movies = require('./0-Db')

Movies.updateMany()

const init = async () => {
  try {
    console.log('---------------------------')
    /* Forma A
     * https://mongoosejs.com/docs/api/model.html#model_Model.bulkWrite
     * write multple queries and do what they need to in just one query MUCHACHOS
     */
    const last50Movies = await Movies.find({ rank: { $gte: 50 } })

    const bulkQueries = last50Movies.map((movie) => {
      const { title, _id } = movie
      const newTitle = `${title}${additionalText}`
      return {
        updateOne: {
          filter: { _id },
          update: { $set: { title: newTitle } },
        },
      }
    })
    console.log('TCL: init -> bulkQueries', bulkQueries)
    const bulkResult = await Movies.bulkWrite(bulkQueries)
    console.log('TCL: init -> bulkResult', bulkResult)
    // console.log('TCL: init -> queryResult', queryResult)

    // Forma B
    /* Para este lado coger el substring 
                                                          `const additionalText = ' - ultimas 50 - ultimas 50'`
                                                          de las últimas 50 anteriosmente actualizadas y cambiarlas por 
                                                          `const newText =  ' last fifty'`
                                                    */
    // substring()
    const movies = await Movies.find({ rank: { $gte: 50 } })
    for (let index = 0; index < movies.length; index++) {
      const movie = movies[index]
      const subStr = movie.title.substring(
        0,
        movie.title.indexOf(' - ultimas 50 - ultimas 50')
      )
      const newText = ' last fifty'
      movie.title = `${subStr}${newText}`
      await movie.save()
    }

    // console.log('TCL: init -> movies', movies)
  } catch (error) {
    console.error(error)
  }

  /**
           * Antiguo
          {
            "title": "The Lion King",
            "rank": "73",
            "id": "tt0110357"
          },

          NUEVO
          {
            "title": "The Lion King - ultimas 50",
            "rank": "73",
            "id": "tt0110357"
          },
 
          /
*/
}

init()
