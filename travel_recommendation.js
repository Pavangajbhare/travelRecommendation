const resultdiv = document.getElementById("result");

const searchKey = document.getElementById("searchBar").value.toLower();

fetch('./travelRecommendation.json')
    .then(response => response.json())
    .then(data => {
        if( searchKey === "country" || searchKey === "countries") {
            data.countries.forEach(country => {
                const countryDiv = `<div>
                                <h2>${country.name}</h2>
                                <div>${country.cities.map( city =>
                                `<div>                                    
                                    <img src="${city.imageUrl}" alt="${city.name}" width="200">
                                    <h3>${city.name}</h3>
                                    <p>${city.description}</p>
                                </div>`).join('')}
                                </div>
                                </div>`;
                 resultdiv.innerHTML += countryDiv;                    
            });
        }
        else if ( searchKey === "beaches" || searchKey === "beach") {
            data.beaches.forEach( beach => {
                const beachDiv = `<div>
                                    <img src="${beach.imageUrl} alt="beach image" width="200">
                                    <h3>${beach.name}</h3>
                                    <p>${beach.description}</p>
                                    </div>`
                resultdiv.innerHTML += beachDiv
            })
        
        }
    })