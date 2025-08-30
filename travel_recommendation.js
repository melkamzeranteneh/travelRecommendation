const countryTimeZones = {
  "australia": "Australia/Sydney",
  "japan": "Asia/Tokyo",
  "brazil": "America/Sao_Paulo",
  "bora bora, french polynesia": "Pacific/Tahiti",
  "copacabana beach, brazil": "America/Sao_Paulo",
  "angkor wat, cambodia": "Asia/Phnom_Penh",
  "taj mahal, india": "Asia/Kolkata"
};

function getLocalTime(name) {
  const tz = countryTimeZones[name.toLowerCase()];
  if (!tz) return '';
  const options = { timeZone: tz, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return `<div class="country-time">Local time: ${new Date().toLocaleTimeString('en-US', options)}</div>`;
}

function Recommend_() {
  console.log("the function is called...")
  const input = document.getElementById('search-input').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let found = false;

      // Helper to render a card
      function renderCard(title, img, desc) {
        return `<div class="recommendation-card">
          ${img ? `<img src="${img}" alt="${title}" width="90px">` : ''}
          <h2>${title}</h2>
          ${desc ? `<p>${desc}</p>` : ''}
          ${getLocalTime(title)}
          <button>visit</button>
        </div>`;
      }

      // If searching for "country" or "countries"
      if (input === 'country' || input === 'countries') {
        data.countries.forEach(country => {
          found = true;
          let card = `<div class="recommendation-card"><h2>${country.name}</h2>`;
          if (country.cities && country.cities.length > 0) {
            country.cities.forEach(city => {
              card += `<img src="${city.imageUrl}" alt="city" width="90px">`;
              card += `<h3>${city.name}</h3>`;
              card += `<p>${city.description}</p>`;
              card += getLocalTime(city.name);
            });
          }
          card += getLocalTime(country.name);
          card += `<button>visit</button></div>`;
          resultDiv.innerHTML += card;
        });
      }

      // If searching for "beach" or "beaches"
      if (input === 'beach' || input === 'beaches') {
        data.beaches.forEach(beach => {
          found = true;
          resultDiv.innerHTML += renderCard(beach.name, beach.imageUrl, beach.description);
        });
      }

      // If searching for "temple" or "temples"
      if (input === 'temple' || input === 'temples') {
        data.temples.forEach(temple => {
          found = true;
          resultDiv.innerHTML += renderCard(temple.name, temple.imageUrl, temple.description);
        });
      }

      // Partial match for country names
      data.countries.forEach(country => {
        if (
          country.name.toLowerCase().includes(input) &&
          input.length > 0 &&
          input !== 'country' &&
          input !== 'countries'
        ) {
          found = true;
          let card = `<div class="recommendation-card"><h2>${country.name}</h2>`;
          if (country.cities && country.cities.length > 0) {
            country.cities.forEach(city => {
              card += `<img src="${city.imageUrl}" alt="city" width="90px">`;
              card += `<h3>${city.name}</h3>`;
              card += `<p>${city.description}</p>`;
              card += getLocalTime(city.name);
            });
          }
          card += getLocalTime(country.name);
          card += `<button>visit</button></div>`;
          resultDiv.innerHTML += card;
        }
      });

      // Partial match for beaches
      data.beaches.forEach(beach => {
        if (
          beach.name.toLowerCase().includes(input) &&
          input.length > 0 &&
          input !== 'beach' &&
          input !== 'beaches'
        ) {
          found = true;
          resultDiv.innerHTML += renderCard(beach.name, beach.imageUrl, beach.description);
        }
      });

      // Partial match for temples
      data.temples.forEach(temple => {
        if (
          temple.name.toLowerCase().includes(input) &&
          input.length > 0 &&
          input !== 'temple' &&
          input !== 'temples'
        ) {
          found = true;
          resultDiv.innerHTML += renderCard(temple.name, temple.imageUrl, temple.description);
        }
      });

      if (!found) {
        resultDiv.innerHTML = '<div class="recommendation-card not-found">Place not found.</div>';
      }
    console.log("the function is working fine")  
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = '<div class="recommendation-card not-found">An error occurred while fetching data.</div>';
    });
}

// Add clear functionality for the Reset button
document.addEventListener('DOMContentLoaded', function() {
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      document.getElementById('result').innerHTML = '';
      document.getElementById('search-input').value = '';
    });
  }
});