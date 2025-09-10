fetch('./country.json')
    .then(response => response.json())
    .then(data => {
        console.log(data[0].name)
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

//testing fetch country code using restcountries api
const countryName = 'United Kingdom'
const country = `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`

fetch(country)
    .then(response => response.json())
    .then(data => countryFunc(data))
    .catch(error => console.error('Error fetching country data:', error));

function countryFunc(data){
    console.log(data[0].ccn3); //fetch country code
}

//API Key:72286423a155d841b461770267224a5d