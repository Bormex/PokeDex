
// the cards in mainContent
function pokemonCardTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, typeBuffer) {
    return `
    <div id="content"> 
      <div class="pokeCard" onclick="dialogOverlay(${i})" style = "background-color: ${backgroundColorOfTyp}; width: fit-content;">
        <div class="pokemonName"> <span>${pokemonId}</span> ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase()}</div>
          <div><img src="${pokemonImage}" alt="${pokemonImage}"></div>
        </div>
      <div id="types">${typeBuffer.join(' ')}</div>
    </div>
    `
}

// the loading spinner
function loadingSpinnerTemplate() {
    return `
    <div id="loaderPosition" class="loaderPosition">
      <div class="loaderBox">
        <img src="./assets/img/pokemon-1536849_1920-loadingSpinner.png" alt="./assets/img/pokemon-1536849_1920-loadingSpinner.png">
      </div>
    </div>
    `
}

// the dialog overlay
function dialogOverlayTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elemtens, statsOfPokemon, aboutPokemon) {
  return `
  <div class="dialogBackground" id="dialogBackground" onclick="closeDialogOverlay()">
      <div class="dialogDiv" onclick="eventBubbling(event)" style="background-color: ${backgroundColorOfTyp}; width: fit-content;">
          <div class="pokeIDAndName">
              <p>${pokemonId}</p>
              <p>${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase()}</p>
          </div>

          <div class="pokeImgBox">
              <div class="swipe" onclick="swipeLeft(${i - 1})">
                  <button><</button>
              </div>
              <img src="${pokemonImage}" alt="${pokemonImage}">
              <div class="swipe" onclick="swipeRight(${i + 1})">
                  <button>></button>
              </div>
          </div>

          <div id="aboutPokemon">
              <div style="display: flex; justify-content: space-evenly; padding-bottom: 16px;">
                  ${elemtens.join('')}
              </div>
              <div style="padding-bottom: 8px;">
                  <button id="btn1" onclick="showTab(1)" style="background-color: black; color: white">Information</button>
                  <button id="btn2" onclick="showTab(2)">Stats</button>
              </div>
              <div class="tab-content" data-tab="1">${aboutPokemon}</div>
              <div class="tab-content hidden" data-tab="2">${statsOfPokemon}</div>
          </div>
      </div>
  </div>
  `;
}

// to put the overlay in an extra div what is at onclick loading in to html
function creatingOverlayDiv() {
    return `
    <div class="overlayDiv" id="overlayDiv"></div>
    `
}

// the Div for searched pokemons
function pokemonSearchTemplate(i, pokemonName, pokemonId, pokemonImage, backgroundColorOfTyp, elemtens) {
    return `
    <div class="sContent">
        <div class="sPokeCard" onclick="dialogOverlay(${i})" style = "background-color: ${backgroundColorOfTyp}; width: fit-content;">
          <div class="pokemonSearchName">${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase()} <span>${pokemonId}</span></div>
            <div><img src="${pokemonImage}" alt="${pokemonImage}"></div>
        </div>
      <div id="searchTypes">${elemtens.join('')}</div>
    </div>
    `
}


function statsTemplate(statName, statValue, statValueInProc) {
    return `
    <div>
      <div class="stat-bar">
        <span class="stat-name">${(statName.charAt(0).toUpperCase() + statName.slice(1).toLowerCase())}</span>
          <span class="stat-graphic">
            <div class="statsbalken">
              <div class="stat-number" style="background-color: #76c7c0; width: ${statValueInProc}; height: 100%; border-radius: 5px;"></div>
            </div>
          </span>
        <span>${statValue}</span>
      </div>
    </div>
    `
}

function informationTempalte(weight, height, ability) {
    return `
    <div>
      <div>Größe: ${height}</div>
        <div>Gewicht: ${weight}</div>
      <div>Fähigkeiten: ${ability}</div>
    </div>
    `
}