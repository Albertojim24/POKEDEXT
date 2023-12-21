
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

const listaPokemonAsync= async (page=1)=>{
    let response= await fetch (URL + page)
    let reJson= await response.json();
    console.log(reJson.id)
    return reJson
}

const cargarPokemons = async() => {
    let pokemons = []
    for (let i = 1; i <= 151; i++) {
        // fetch(URL + i)
        //     .then((response) => response.json())
        //     .then(data => mostrarPokemon(data))
        const pokemon = await listaPokemonAsync(i)
        mostrarPokemon(pokemon)
        pokemons.push(pokemon)
    }
    console.log(pokemons)
    clickHeader(pokemons)
}

cargarPokemons();
let divs=document.createElement("div");
document.body.appendChild(divs)
divs.textContent= "   "

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-imagen ">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info "> 
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height/10}m</p>
                <p class="stat">${poke.weight/10}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}
const clickHeader= (pokemons)=>{
     botonesHeader.forEach(boton=> boton.addEventListener("click",(Event)=>{
         const botonId= Event.currentTarget.id;
         console.log(botonId)
 const pokemonsFiltered=pokemons.filter (pokemon=>{ 
    let tipos = pokemon.types.map((type) => type.type.name);
     tipos = tipos.join('');
    
        if (tipos.includes(botonId)) {
            return pokemon
        }
     
 })

 console.log(pokemonsFiltered)
listaPokemon.innerHTML=" "
 for (const pokemon of pokemonsFiltered) {
    mostrarPokemon(pokemon)

    
 }
 }))
 }




