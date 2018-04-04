const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (heroArray) => {
    let heroCard = '';
    heroArray.forEach((hero) => {
        heroCard += `<li>`;
        heroCard +=     `<a href="#">${hero.name}</a>`;
        heroCard += `</li>`;
        
    });
    printToDom(heroCard, 'awesome-dropdown');
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