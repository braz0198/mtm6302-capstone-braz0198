// 
const pokedex = document.getElementById('pokedex');
const cachedPokemon = {};
// Generates Pokemon Image
async function fetchPokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=40`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
    }));

    displayPokemon(pokemon);
}
// Display Pokemon Card
function displayPokemon(pokemon) {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </a>
    </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
}
// Creates the pop up window
async function selectPokemon(id) {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
}
// Adds the pop up function that displays the pokemons attributes, the pop up wouldn't work without this
function displayPokemanPopup(pokeman) {
    console.log(pokeman);
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${pokeman.sprites['front_default']}"/>
                <h2 class="card-title">${pokeman.name}</h2>
                <p><small>Type: ${type} | Height:</small> ${pokeman.height} | Weight: ${pokeman.weight}</p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
}
// Makes the Close Button Functional
function closePopup() {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
// Gets Pokemon List 
fetchPokemon();