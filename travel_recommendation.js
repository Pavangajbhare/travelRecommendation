const resultdiv = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const resultBtn = document.getElementById("resetBtn");

function getResults() {
    const searchKey = document.getElementById("searchBar").value.toLowerCase();
    resultdiv.innerHTML = "";
    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        if (searchKey === "country" || searchKey === "countries") {
            data.countries.forEach(country => {
                const countryDiv = `<div>
                                <h2>${country.name}</h2>
                                <div>${country.cities.map(city =>
                                    `<div>                                    
                                        <img src="${city.imageUrl}" alt="${city.name}" width="200">
                                        <h3>${city.name}</h3>
                                        <p>${city.description}</p>
                                    </div>`).join('')}
                                </div>
                                </div>`;
                resultdiv.innerHTML += countryDiv;
            });
        } else if (searchKey === "beaches" || searchKey === "beach") {
            data.beaches.forEach(beach => {
                const beachDiv = `<div>
                                    <img src="${beach.imageUrl}" alt="beach image" width="200">
                                    <h3>${beach.name}</h3>
                                    <p>${beach.description}</p>
                                  </div>`;
                resultdiv.innerHTML += beachDiv;
            });
        } else if (searchKey === "temples" || searchKey === "temple") {
            data.temples.forEach(temple => {
                const templeDiv = `<div>
                                    <img src="${temple.imageUrl}" alt="temple image" width="200">
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
    resultdiv.innerHTML="";
}

searchBtn.addEventListener('click', getResults);
resultBtn.addEventListener('click', resetResults);