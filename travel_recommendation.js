function Recommend_() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
          .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            const beach = data.beaches.find(item => item.name.toLowerCase() === input);
            const temple = data.temples.find(item => item.name.toLowerCase() === input);
            if(country) {
              resultDiv.innerHTML += `<img src="${country.imageUrl}" alt="country" width="30px">`;
              resultDiv.innerHTML += `<h2>${country.name.join(', ')}</h2>`;
              resultDiv.innerHTML += `<p> ${country.description}</p>`;
              resultDiv.innerHTML += `<button>visit</button>`;
            }
            if(beach){
              resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="country" width="30px>`;
              resultDiv.innerHTML += `<h2>${beach.name.join(', ')}</h2>`;
              resultDiv.innerHTML += `<p> ${beach.description}</p>`;
              resultDiv.innerHTML += `<button>visit</button>`;
            }
            if(temple) {
              resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="country" width="30px>`;
              resultDiv.innerHTML += `<h2>${temple.name.join(', ')}</h2>`;
              resultDiv.innerHTML += `<p> ${temple.description}</p>`;
              resultDiv.innerHTML += `<button>visit</button>`;
            }
            else{
              resultDiv.innerHTML = 'Condition not found.';
            }
          })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
        }