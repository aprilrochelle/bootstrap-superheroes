let selectedHero = '';

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (heroArray) => {
    let heroCard = '';
    heroArray.forEach((hero) => {
        heroCard += `<li>`;
        heroCard +=     `<a class="hero-selection" data-hero-id="${hero.id}">${hero.name}</a>`;
        heroCard += `</li>`;
        
    });
    printToDom(heroCard, 'awesome-dropdown');
}

const selectHero = (e) => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById('awesome-button').classList.add('hide');
    genericHeroRequest(loadFileForSingleHero);

}

const addHeroSelectEventListeners = () => {
    const heroPick = document.getElementsByClassName('hero-selection');
    for (let i=0; i<heroPick.length; i++) {
        heroPick[i].addEventListener('click', selectHero);
    }
}

const displaySuperhero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom(domString, "selected-hero");
  }

function loadFileForSingleHero() {
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes);
}

function executeOnLoad() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    addHeroSelectEventListeners(data.superheroes);
}

function executeIfFail () {
    console.log('Something went wrong.');
}

const genericHeroRequest = (successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', successFunction);
    myRequest.addEventListener('error', executeIfFail);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
}

const startApp = () => {
    genericHeroRequest(executeOnLoad);
}

startApp();