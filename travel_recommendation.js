const resultdiv = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const main = document.querySelector("main");
const body = document.querySelector("body");

const countryTimeZones = {
    "Australia": "Australia/Sydney",
    "Japan": "Asia/Tokyo",
    "Brazil": "America/Sao_Paulo"
};

function getLocalTime(countryName) {
    const timeZone = countryTimeZones[countryName];
    if (!timeZone) return "Time zone not available";
    return new Date().toLocaleTimeString('en-US', {
        timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

function getResults() {
    resultdiv.style.display = "grid";
    resultdiv.innerHTML = "";
    main.style.display = "none";
    body.style.overflowY = "visible";
    
    const searchKey = document.getElementById("searchBar").value.toLowerCase();
    
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const matchedCountry = data.countries.find(c => c.name.toLowerCase() === searchKey);
            
            if (searchKey === "country" || searchKey === "countries") {
                data.countries.forEach(country => {
                    const localTime = getLocalTime(country.name);
                    const countryDiv = `
                        <div class="country result-item">
                            <h2>${country.name}</h2>
                            <h3>Local Time: ${localTime}</h3>
                            ${country.cities.map(city => `
                                <div class="city result-item">
                                    <img src="${city.imageUrl}" alt="${city.name}">
                                    <h3>${city.name}</h3>
                                    <p>${city.description}</p>
                                </div>`).join('')}
                        </div>`;
                    resultdiv.innerHTML += countryDiv;
                });
            } else if (matchedCountry) {
                const localTime = getLocalTime(matchedCountry.name);
                const countryDiv = `
                    <div class="country result-item">
                        <h2>${matchedCountry.name}</h2>
                        <h3>Local Time: ${localTime}</h3>
                        <div class="country-grid">
                            ${matchedCountry.cities.map(city => `
                                <div class="city result-item">
                                    <img src="${city.imageUrl}" alt="${city.name}">
                                    <h3>${city.name}</h3>
                                    <p>${city.description}</p>
                                </div>`).join('')}
                        </div>
                    </div>`;
                resultdiv.innerHTML += countryDiv;
            } else if (searchKey === "beaches" || searchKey === "beach") {
                resultdiv.innerHTML = `<h2>Beaches</h2>`;
                data.beaches.forEach(beach => {
                    const beachDiv = `<div class="beach result-item">
                        <img src="${beach.imageUrl}" alt="beach image">
                        <h3>${beach.name}</h3>
                        <p>${beach.description}</p>
                    </div>`;
                    resultdiv.innerHTML += beachDiv;
                });
            } else if (searchKey === "temples" || searchKey === "temple") {
                resultdiv.innerHTML = `<h2>Temples</h2>`;
                data.temples.forEach(temple => {
                    const templeDiv = `<div class="temple result-item">
                        <img src="${temple.imageUrl}" alt="temple image">
                        <h3>${temple.name}</h3>
                        <p>${temple.description}</p>
                    </div>`;
                    resultdiv.innerHTML += templeDiv;
                });
            } else {
                resultdiv.innerHTML = `<p>No such keywords. Try keywords like 'beaches', 'countries', 'temples', or a country name like 'Japan'</p>`;
            }
        })
        .catch(error => {
            resultdiv.innerHTML = `<p>Error in fetching: ${error}</p>`;
        });
}

function resetResults() {
    const searchKey = document.getElementById("searchBar");
    searchKey.value = "";
    resultdiv.innerHTML = "";
    resultdiv.style.display = "none";
    main.style.display = "flex";
    body.style.overflowY = "hidden";
}

searchBtn.addEventListener('click', getResults);
resetBtn.addEventListener('click', resetResults);
