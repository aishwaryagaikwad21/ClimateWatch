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

    const Url = `http://localhost:3000/fetchaqi?country=${country}&city=${city}`
    fetch(Url)
    .then((res) => {
        res.json()
            .then((data) => {
                if(data.aqi){
                    //console.log(`AQI of ${city} is`, data.aqi);
                    const resultCard = document.getElementById('resultCard');
                    resultCard.style.display = 'block';
                    const cityName = document.getElementById('cityName');
                    cityName.textContent = city;
                    const aqiValue = document.getElementById('aqiValue');
                    aqiValue.textContent = `AQI is ${data.aqi}`;
                    } else{
                        console.log(`No data found for ${city}`);
                    }
            })
    })
    .catch(error => console.error('Error fetching AQI data:', error)) 
}

