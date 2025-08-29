function Recommend_() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let found = false;
      // Check for country
      const country = data.countries.find(item => item.name.toLowerCase() === input);
      if (country) {
        found = true;
        resultDiv.innerHTML += `<h2>${country.name}</h2>`;
        if (country.cities && country.cities.length > 0) {
          country.cities.forEach(city => {
            resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="city" width="30px">`;
            resultDiv.innerHTML += `<h3>${city.name}</h3>`;
            resultDiv.innerHTML += `<p>${city.description}</p>`;
          });
        }
        resultDiv.innerHTML += `<button>visit</button>`;
      }
      // Check for beach
      const beach = data.beaches.find(item => item.name.toLowerCase() === input);
      if (beach) {
        found = true;
        resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="beach" width="30px">`;
        resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
        resultDiv.innerHTML += `<p>${beach.description}</p>`;
        resultDiv.innerHTML += `<button>visit</button>`;
      }
      // Check for temple
      const temple = data.temples.find(item => item.name.toLowerCase() === input);
      if (temple) {
        found = true;
        resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="temple" width="30px">`;
        resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
        resultDiv.innerHTML += `<p>${temple.description}</p>`;
        resultDiv.innerHTML += `<button>visit</button>`;
      }
      if (!found) {
        resultDiv.innerHTML = 'Condition not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}