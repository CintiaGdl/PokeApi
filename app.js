window.onload = () => {
    init();
}

let pokemosMapped = [];

const init = async () => {
    const pokeList = await getPokeList();
    // console.log('pokeList', pokeList);
    pokemosMapped = await mappedPoke(pokeList);
    // console.log('pokemosMapped', pokemosMapped);
    printPoke(pokemosMapped);
}


const getPokeList = async () => {
    let pokemonsArray = [];
    for (let i = 1; i <= 150 ; i++) {
        const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokeJson = await pokemonData.json();
        pokemonsArray.push(pokeJson);
    }
    return pokemonsArray;
}

function mappedPoke(pokemos) {
    console.log('pokemos', pokemos)
    const pokemapped = pokemos.map(poke => {
        return {
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default,
        }
    })
    return pokemapped;
}

function printPoke(pokemos) {
    let list = document.createElement('div');
    list.className = 'containerPoke';
    // console.log(pokemos)
    pokemos.forEach(poke => {
        list.innerHTML += `<div class="card">
        <h3>${poke.name}</h3>
        <img src=${poke.img} class="imageCard"/>
        </div>`
    });
    document.body.appendChild(list);
}

const inputSearch = document.querySelector('#inputSearch')
const buttonSearch = document.querySelector('#searchButton')

function deleteContainer() {
    document.getElementsByClassName('containerPoke')[0].remove();
}


function buttonHandler() {
    const searchWord = inputSearch.value;
    console.log(searchWord);
    pokemosFilter = pokemosMapped.filter(poke => poke.name.includes(searchWord));
    console.log(pokemosFilter);
    deleteContainer();
    printPoke(pokemosFilter);
}
buttonSearch.addEventListener('click', buttonHandler);