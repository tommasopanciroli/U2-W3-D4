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
    const col = document.getElementById('card-container')
    col.innerHTML = `
    <div class="card">
         <img src="https://www.adobe.com/creativecloud/photography/discover/media_15955bf89f635a586d897b5c35f7a447b495f6ed7.jpeg?width=1200&format=pjpg&optimize=medium" class="card-img-top" alt="..."" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${singleConcert.name}</h5>
            <p class="card-text">${singleConcert.description}</p>
            <p class="card-text">${singleConcert.price}€</p>
            <a class ="btn btn-warning"  href="./backoffice.html?concertId=${concertId}">MODIFICA</a>
            <button class ="btn btn-danger" onclick ="deleteConcert()">ELIMINA</button>
        </div>
    </div>
    `
  })
  .catch((error) => {
    console.log('ERROR', error)
  })

const deleteConcert = function () {
  console.log('PROVO A ELIMINARE IL CONCERTO')
  //elimino con una fetch
  fetch(EPITICKET_URL + '/' + concertId, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        //ELIMINAZIONE AVVENUTA CON SUCCESSO
        alert('Concerto eliminato')
        //REDIRECT HOMEPAGE
        window.location.assign('./index.html')
      } else {
        throw new Error('Eliminare il concerto non è stato possibile')
      }
    })
    .catch((error) => {
      console.log('ERRORE', error)
    })
}
