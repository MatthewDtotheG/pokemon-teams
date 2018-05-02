document.addEventListener("DOMContentLoaded", function(e){
  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`

  fetch(TRAINERS_URL)
  .then(x => x.json())
  .then(json => display(json))
})

function display(json){
  json.forEach(function(x){
    document.getElementById('main').innerHTML += (`
    <div class="card" data-id="${x.id}"><p>${x.name}</p>
      <button class='add' data-trainer-id="${x.id}">Add Pokemon</button>
      <ul id='${x.id}'></ul>
    </div>`)
  x.pokemons.forEach(function(y){
      document.getElementById(`${x.id}`).innerHTML += (`
        <li id='fuck${y.id}'>${y.nickname} (${y.species}) <button class="release" data-pokemon-id="${y.id}">Release</button></li>`)
    })
  })
  document.getElementById('main').addEventListener('click', addPokemon)
  document.getElementById('main').addEventListener('click', deletePokemon)
}

function addPokemon(e){
  if(e.target.className === 'add'){
    // console.log(e.target.dataset.trainerId)
    fetch('http://localhost:3000/pokemons', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({trainer_id: `${e.target.dataset.trainerId}`})
    }).then(x => x.json()).then(function(x) {
      document.getElementById(`${x.trainer_id}`).innerHTML += (`
        <li id='fuck${x.id}'>${x.nickname} (${x.species})
        <button class="release" data-pokemon-id="${x.id}">Release</button></li>`)
      })
    }
  }

function deletePokemon(e){
  if(e.target.className === 'release'){
    // console.log(e.target.dataset.pokemonId)
    document.getElementById(`fuck${e.target.dataset.pokemonId}`).remove()
    fetch(`http://localhost:3000/pokemons/${e.target.dataset.pokemonId}`, {
      method: 'DELETE'
    })
  }
}
