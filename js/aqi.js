fetch('./country.json')
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

        if (matchedCountry && matchedCountry.cities.length > 0) {
            matchedCountry.cities.forEach(city => {
                const cityOption = document.createElement('option');
                cityOption.value = city.trim();
                cityOption.textContent = city;
                cityDropdown.appendChild(cityOption);
            });
        }
    })
}

//API Key:72286423a155d841b461770267224a5d

function displayResults(){
    const country = document.getElementById('countryDropdown').value;
    const city = document.getElementById('cityDropdown').value;
    console.log(country, city);

    const countryUrl = `https://restcountries.com/v3.1/name/${country.toLowerCase()}`
    fetch(countryUrl)
        .then(response => response.json())
        .then(data => {
            const countryCode = data[0].ccn3; //fetch country code
            console.log(countryCode);
        })
        .catch(error => console.error('Error fetching country code data:', error));
}