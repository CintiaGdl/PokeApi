window.onload = () => {
    init();
}

const init = async () => {
    const pokeList = await getPokeList();
    console.log('pokeList', pokeList);
    const pokemosMapped = await mappedPoke(pokeList);
    console.log('pokemosMapped', pokemosMapped);

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
    console.log(pokemos)
    pokemos.forEach(poke => {
        list.innerHTML += `<div class="card">
        <h3>${poke.name}</h3>
        <img src=${poke.img} />
        </div>`
    });
    document.body.appendChild(list);
}