const resultdiv = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const main = document.querySelector("main");
function getResults() {
    resultdiv.style.display = "block";
    resultdiv.innerHTML = "";
    const searchKey = document.getElementById("searchBar").value.toLowerCase();
    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        if (searchKey === "country" || searchKey === "countries") {
            data.countries.forEach(country => {
                const countryDiv = `<div class="countries">
                                <h2>${country.name}</h2>
                                <div class="country">${country.cities.map(city =>
                                    `<div class="result-card">                                    
                                        <img src="${city.imageUrl}" alt="${city.name}">
                                        <h3>${city.name}</h3>
                                        <p>${city.description}</p>
                                    </div>`).join('')}
                                </div>
                                </div>`;
                resultdiv.innerHTML += countryDiv;
            });
        } else if (searchKey === "beaches" || searchKey === "beach") {
            data.beaches.forEach(beach => {
                const beachDiv = `<div class="beach result-card">
                                    <img src="${beach.imageUrl}" alt="beach image">
                                    <h3>${beach.name}</h3>
                                    <p>${beach.description}</p>
                                  </div>`;
                resultdiv.innerHTML += beachDiv;
            });
        } else if (searchKey === "temples" || searchKey === "temple") {
            data.temples.forEach(temple => {
                const templeDiv = `<div class="temple result-card">
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
    result.style.display = "none";
}

searchBtn.addEventListener('click', getResults);
resetBtn.addEventListener('click', resetResults);