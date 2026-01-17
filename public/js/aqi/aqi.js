fetch('/js/aqi/countries.json')
    .then(response => response.json())
    .then(data => {
        menuOptions(data)
    })
    .catch(error => console.error('Error fetching country data:', error));

function menuOptions(data){
    const countryDropdown = document.getElementById('countryDropdown');
    const cityDropdown = document.getElementById('cityDropdown');

    data.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.trim();
        option.textContent = country.name;
        countryDropdown.appendChild(option);
    })

    countryDropdown.addEventListener('change', (e) => {
        
        const selectedCountry = e.target.value;
        cityDropdown.innerHTML = '<option value="" disabled selected hidden>Select a City</option>';

        const matchedCountry = data.find(country => country.name === selectedCountry);

        if (matchedCountry && Array.isArray(matchedCountry.cities)) {
            matchedCountry.cities.forEach(city => {
                const cityOption = document.createElement('option');
                cityOption.value = city;
                cityOption.textContent = city;
                cityDropdown.appendChild(cityOption);
            });
        }
    })
}

function displayResults(){
    const country = document.getElementById('countryDropdown').value;
    const city = document.getElementById('cityDropdown').value;
    //console.log(country, city);

    const countryUrl = `https://restcountries.com/v3.1/name/${country.toLowerCase()}`
    fetch(countryUrl)
        .then(response => response.json())
        .then(data => {
            const countryCode = data[0].cca2; //fetch country code
            //console.log(countryCode);
            getAqi(countryCode, city);
        })
        .catch(error => console.error('Error fetching country code data:', error));
}

function getAqi(countryCode, city){
    const apiKey = 'b98fce104980f877d09ca58739e0253854bd5f8a';
    fetch(`https://api.waqi.info/feed/${city}/?token=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if(data.data.aqi){
        //console.log(`AQI of ${city} is`, data.data.aqi);
        const resultCard = document.getElementById('resultCard');
        resultCard.style.display = 'block';
        const cityName = document.getElementById('cityName');
        cityName.textContent = city;
        const aqiValue = document.getElementById('aqiValue');
        aqiValue.textContent = `AQI is ${data.data.aqi}`;
        } else{
            console.log(`No data found for ${city}`);
        }
    })
    .catch(error => console.error('Error fetching AQI data:', error));
}