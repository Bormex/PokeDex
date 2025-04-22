
let pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"; // an limit= x;  kannst du mehr pokemons laden lassen!! 
const POKE_INFO_URL = "https://pokeapi.co/api/v2/pokemon" // info of each pokemon it self
let typeColors = {          // color sheet for background of pokemon & there type background color
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
}                   

// initialization step
async function init() {
    await renderAll();
}

// render all into html at begin 
async function renderAll() {
    loadingSpinner();
    await putPokemonCardsInToHTML();
}

// main func to render information into HTML
async function putPokemonCardsInToHTML() {
    const mainContentRef = document.getElementById('mainContent');
    const resultsLength = await getPokemonResultsLength();
    for (let i = 1; i < resultsLength + 1; i++) {
        const { pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements } = await returnInfoOfEachPokemon(i);
        mainContentRef.innerHTML += pokemonCardTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements);
    }
}

// getting the whole information of each pokemon
async function fetchPokemonInfo(path = "") {
    let response = await fetch(POKE_INFO_URL + path);
    return (responseToJson = await response.json());
}

// shorting to get infos of each pokemon
async function returnInfoOfEachPokemon(i) {
    const pokeResponse = await fetchPokemonInfo(`/${i}`);   // get the whole information of each pokemon
    const pokemonName = pokeResponse.name;            // get name of the pokemon
    const pokemonId = pokemonID(i);                // get the id of the pokemon
    const pokemonImage = pokeResponse.sprites.other['official-artwork'].front_default;  // get image of the pokemon
    const backgroundColorOfTyp = await pokemonTypeBackColor(i); // get the background color of the first element of the pokemon for background of pokemon temp
    const elements = await pokemonTypes(i); // get types (elements) of the pokemon
    const statsOfPokemon = await getPokemonStats(i);
    const aboutPokemon = await getPokemonInformations(i);
    return {pokeResponse, pokemonName,pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon}  // return the whole variables
}

// Hp, Atk, Def
async function getPokemonStats(i) {
    const pokeResponse  = await fetchPokemonInfo(`/${i}`);
    let statBuffer = "";
    for (let index = 0; index < 3; index++) {   // "3" weil wir nur die ersten drei stats (hp, atk & def wollen!)
        const statName = pokeResponse.stats[index].stat.name;
        const statValue = pokeResponse.stats[index].base_stat;
        const statValueInProc = (pokeResponse.stats[index].base_stat / 2) + "%"; // convertet in %
        statBuffer += statsTemplate(statName, statValue, statValueInProc);
    }
    return statBuffer;
}

// Height, Weight, abilitys
async function getPokemonInformations(i) {
    const pokeResponse = await fetchPokemonInfo(`/${i}`);
    const weight = (((pokeResponse.weight) / 10) + "kg");   // conv. to kilogram
    const height = (((pokeResponse.height) / 10) + "m");   // conv. to meter
    let ability = "";
    let informationTempBuffer = "";
    for (let index = 0; index < pokeResponse.abilities.length; index++) {
        if (index !== 0) {
            ability += ", " + (pokeResponse.abilities[index].ability.name).charAt(0).toUpperCase() + (pokeResponse.abilities[index].ability.name).slice(1).toLowerCase();
        } else {
            ability += (pokeResponse.abilities[index].ability.name).charAt(0).toUpperCase() + (pokeResponse.abilities[index].ability.name).slice(1).toLowerCase();
        }
    }
    informationTempBuffer += informationTempalte(weight, height, ability);
    return informationTempBuffer
}

// getting the length of current loaded pokemons
async function getPokemonResultsLength() {
    let response = await fetch(pokeUrl);
    let data = await response.json();
    return data.results.length;
}

// getting Pokemon Index ID 
function pokemonID(i) {
    const pokemonId = i;                // get the id of the pokemon
    if (pokemonId < 10) {
        return (`#000` + pokemonId)
    } else if (pokemonId < 100) {
        return (`#00` + pokemonId)
    } else if (pokemonId < 1000) {
        return (`#0` + pokemonId)
    }else if (pokemonId < 10000) {
        return (`#` + pokemonId)
    }    
}

// getting Pokemon Types (Elements)
async function pokemonTypes(i) {
    const pokeResponse = await fetchPokemonInfo(`/${i}`);
    let typeElemtens = pokeResponse.types[0].type.name;          // get the (first) type (Element) of the pokemon
    Object.keys(typeColors) == typeElemtens;
    let typeArr = [];
    for (let j = 0; j < pokeResponse.types.length; j++) {
        let typeElemtens = pokeResponse.types[j].type.name;          // get the types (Elements) of the pokemon
        typeArr.push(`<p style="background-color: ${typeColors[typeElemtens]};" >${(typeElemtens.charAt(0).toUpperCase() + typeElemtens.slice(1).toLowerCase())}</p>`)
        if (typeArr.length == pokeResponse.types.length) {
            return typeArr
        }
    }
}

// getting first Type of Pokemon as Background Color
async function pokemonTypeBackColor(i) {
    const pokeResponse = await fetchPokemonInfo(`/${i}`);
    let typeElemtens = pokeResponse.types[0].type.name;          // get the (first) type (Element) of the pokemon
    Object.keys(typeColors) == typeElemtens;
    return typeColors[typeElemtens];
}

// load more pokemons in html
async function loadMorePokemons(y) {
    let h = await getPokemonResultsLength();
    let x = h + y;
    pokeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${x}&offset=${h}`;
    addMorePokemonCardsInToHTML(h);
}

const mainContentRef = document.getElementById('mainContent');
// getting the pokemon info and put in html
async function addMorePokemonCardsInToHTML(h) {
    loadingSpinner();
    const resultsLength = await getPokemonResultsLength();
    for (let i = h + 1; i < resultsLength + 1; i++) {
        const {pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements} = await returnInfoOfEachPokemon(i);
        mainContentRef.innerHTML += pokemonCardTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements);
        typeBuffer = [];
    }
}

// open dialog Overlay
async function dialogOverlay(i) {
    if (document.getElementById('overlayDiv') !== null) {
        document.getElementsByClassName('overlayDiv')[0].remove();      // deleting the prev. Div
    }
    const body = document.getElementById('body');
    body.innerHTML += creatingOverlayDiv();                         
    const overlayDiv = document.getElementById('overlayDiv');
    const {pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon} = await returnInfoOfEachPokemon(i);
    overlayDiv.innerHTML = dialogOverlayTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon);
}

// swipe left in overlay div
async function swipeLeft(i) {
    if (i == 0) {i = document.getElementsByClassName('pokemonName').length;}
    const body = document.getElementById('body');
    body.innerHTML += creatingOverlayDiv();                         //<----- adde eine div die sich erst rendert und da dann alles rein läd!!!!
    const overlayDiv = document.getElementById('overlayDiv');
    document.getElementsByClassName('overlayDiv')[1].remove();
    const { pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon} = await returnInfoOfEachPokemon(i);
    overlayDiv.innerHTML = dialogOverlayTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon);
}

// swipe right in overlay div
async function swipeRight(i) {
    if (i == (document.getElementsByClassName('pokemonName').length + 1)) {i = 1;}
    const body = document.getElementById('body');
    body.innerHTML += creatingOverlayDiv();                         //<----- adde eine div die sich erst rendert und da dann alles rein läd!!!!
    const overlayDiv = document.getElementById('overlayDiv');
    document.getElementsByClassName('overlayDiv')[1].remove();
    const { pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon} = await returnInfoOfEachPokemon(i);
    overlayDiv.innerHTML = dialogOverlayTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements, statsOfPokemon, aboutPokemon);
}

// close the dialog overlay with an click into nothing
function closeDialogOverlay() {
    document.getElementById('dialogBackground').remove();
}

// stopping event bubbling (clicks trough)
function eventBubbling(event) {
    event.stopPropagation();
}

// searching for loaded pokemons
async function searchPokemon() {
    const searchField = document.getElementById('searchField').value.toLowerCase();
    const searchContent = document.getElementById('searchContent');
    const pokemonNames = document.getElementsByClassName('pokemonName');
    searchContent.innerHTML = '';
    if (searchField.length >= 3) {  // Beginne erst nach 3 Buchstaben zu suchen
        searchContent.classList.remove('d_none');
        for (let i = 0; i < pokemonNames.length; i++) {
            const pokemonName = pokemonNames[i].innerText.toLowerCase();
            if (pokemonName.includes(searchField)) {
                const { pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements } = await returnInfoOfEachPokemon((i + 1));
                searchContent.innerHTML += pokemonSearchTemplate((i + 1), pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elements);
            }
        }
    }
}

// selecting Stats / Information etc in Overlay Dialog
function showTab(tabNumber) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('hidden');
    });
    const selectedTab = document.querySelector(`.tab-content[data-tab="${tabNumber}"]`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        selectedTab.classList.add('active');
    }
    showTabBackgroundColorActivTab(tabNumber);
}

// selected Information / Stats - Button
function showTabBackgroundColorActivTab(tabNumber) {
    switch (tabNumber) {
        case 1:
            document.getElementById('btn1').style.backgroundColor = "black";
            document.getElementById('btn1').style.color = "white";
            document.getElementById('btn2').style.backgroundColor = "white";
            document.getElementById('btn2').style.color = "black";
            break;
        case 2:
            document.getElementById('btn2').style.backgroundColor = "black";
            document.getElementById('btn2').style.color = "white";
            document.getElementById('btn1').style.backgroundColor = "white";
            document.getElementById('btn1').style.color = "black";
            break;
    }
}

// loading spinner
async function loadingSpinner() {
    document.getElementById('body').innerHTML += loadingSpinnerTemplate();
    const length = await getPokemonResultsLength();
    while (typeof content === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Warte 1 Sekunde
    }
    const intervalId = setInterval(() => {
        if (content.length === length) {
            document.getElementById('loaderPosition').remove();
            clearInterval(intervalId);
        }
    }, 1000);
}

