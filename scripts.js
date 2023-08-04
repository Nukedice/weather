const button = document.querySelector('.change_city')
const temp = document.querySelector ('.temp');
const city = document.querySelector ('.city');
const input = document.querySelector('.input');
const find = document.querySelector('.find');
function showWeather (data)  {
    temp.innerHTML =` ${Math.round(data.main.temp)-273} °C` ;
    city.innerHTML = `It is ${data.weather[0].description} in ${data.name}`;
}
const KEY = '2283bdd0029833250c6625557f868262';
navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${KEY}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        showWeather(data)
    }).catch(function (err) {
        console.log(err)
    })
})
function showSearch () {
    button.classList.add('hidden');
    temp.classList.add('hidden');
    city.classList.add('hidden');
    input.classList.remove('hidden');
    find.classList.remove('hidden');
}
function displayWeather() {
    button.classList.remove('hidden');
    temp.classList.remove('hidden');
    city.classList.remove('hidden');
    input.classList.add('hidden');
    find.classList.add('hidden');
}
function findCity () {
    console.log (input.value)
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${KEY}`)
    .then ((response) => {return response.json()})
    .then ((data) => {showWeather(data)})
    .then (()=> {displayWeather()})
    .catch((err) =>{alert('can\'t find your city');})
}

button.addEventListener('click', () => {showSearch()})
find.addEventListener('click', ()=> {findCity()})
input.addEventListener('keypress', (e) =>{if(e.key === 'Enter'){findCity()}})