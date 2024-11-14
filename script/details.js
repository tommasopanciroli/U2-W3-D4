const EPITICKET_URL = 'https://striveschool-api.herokuapp.com/api/agenda'

// in questa pagina voglio mostrare i dettagli di ogni concerto
// arriverò a questa pagina cliccando il tasto "vai ai dettagli" di ogni card in home page

// i dettagli della card verranno recuperati con una fetch()
// a differenza però delal fetch() in homepage, che recuperava tutti i concerti
// qui voglio fare una fetch per UN SOLO concerto, ben specifica

//mi sto passando l'_id del concerto che voglio caricare nella barra degli indirizzi
//ora recupererò quell'_id dalla barra degli indirizzi e lo salverò in una variabile

const addressBarContent = new URLSearchParams(window.location.search)
//ho creato una specie di oggetti con tutti i parametri della barra indirizzi

const concertId = addressBarContent.get('concertId') // concertId è il nome del parametro scelto
console.log('concertID', concertId)

// grazie a questo concertId posso fare una fetch con metodo GET molto specifica
// che mi ritornerà non più tutti gli eventi... ma un singolo evento con tutti i dettagli

//indirizzo specifico di ogni evento
fetch(EPITICKET_URL + '/' + concertId)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'evento")
    }
  })
  .then((singleConcert) => {
    console.log('singleConcert', singleConcert)
  })
  .catch((error) => {
    console.log('ERROR', error)
  })
