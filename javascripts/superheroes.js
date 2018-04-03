const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (heroArray) => {
    let heroCard = '';
    heroArray.forEach((hero) => {
        heroCard += `<div class="col-md-3">`;
        heroCard += `<div class="panel">`;
        heroCard +=     `<div class="panel-heading">`;
        heroCard +=         `<h3 class="panel-title">${hero.name}</h3>`;
        heroCard +=     `</div>`;
        heroCard +=     `<div class="panel-body">`;
        heroCard +=         `<img src="${hero.image}" class="charImage">`;
        heroCard +=         `<p class="charDescription">${hero.description}</p>`;
        heroCard +=     `</div>`;
        heroCard += `</div>`;
        heroCard += `</div>`;
    });
    printToDom(heroCard, 'hero-container');
}

function executeOnLoad() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
}

function executeIfFail () {
    console.log('Something went wrong.');
}

const startApp = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeOnLoad);
    myRequest.addEventListener('error', executeIfFail);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
}

startApp();