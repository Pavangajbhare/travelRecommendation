const resultdiv = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const main = document.querySelector("main");
const body = document.querySelector("body");

function getResults() {
    resultdiv.style.display = "grid";
    resultdiv.innerHTML = "";
    main.style.display="none";
    body.style.overflowY = "visible";
    const searchKey = document.getElementById("searchBar").value.toLowerCase();
    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (searchKey === "country" || searchKey === "countries") {
            data.countries.forEach(country => {
                const countryDiv = `
                    <div class="country result-item">
                        <h2>${country.name}</h2>
                        ${country.cities.map(city => `
                        <div class="city result-item">
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                        </div>`).join('')}
                    </div>`;
                resultdiv.innerHTML += countryDiv;
            });
        } else if (searchKey === "beaches" || searchKey === "beach") {
            resultdiv.innerHTML =  `<h2>Beaches</h2>`;
            data.beaches.forEach(beach => {
                const beachDiv = `<div class="beach result-item">
                                    <img src="${beach.imageUrl}" alt="beach image">
                                    <h3>${beach.name}</h3>
                                    <p>${beach.description}</p>
                                  </div>`;
                resultdiv.innerHTML += beachDiv;
            });
        } else if (searchKey === "temples" || searchKey === "temple") {
            resultdiv.innerHTML =  `<h2>Temples</h2>`;
            data.temples.forEach(temple => {
                const templeDiv = `<div class="temple result-item">
                                    <img src="${temple.imageUrl}" alt="temple image">
                                    <h3>${temple.name}</h3>
                                    <p>${temple.description}</p>
                                   </div>`;
                resultdiv.innerHTML += templeDiv;
            });
        }
        else {
            resultdiv.innerHTML = `<p> No such keywords. Try keywords like 'beaches', 'countries', 'temples'</p>`;
        }
    })
    .catch(error => {
        resultdiv.innerHTML = `<p>Error in fetching: ${error} </p>`
    });
};

function resetResults() {
    const searchKey = document.getElementById("searchBar");
    searchKey.value = "";
    resultdiv.innerHTML = ""; // Just clear the content
    resultdiv.style.display = "none";
    main.style.display = "flex";
    body.style.overflowY = "hidden";
}

searchBtn.addEventListener('click', getResults);
resetBtn.addEventListener('click', resetResults);