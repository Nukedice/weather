const button = document.querySelector(".change_city");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const input = document.querySelector(".input");
const find = document.querySelector(".find");
const spinner = document.querySelector(".loading")

const OW_API_KEY = "2283bdd0029833250c6625557f868262";
const IP_API_KEY = "at_eRqcqqInNt1bUk30MoByCCUV19sX3";

if (!navigator.geolocation){
  alert('Ваш браузер не поддерживает геолокацию, либо она отключена в настройках'); // не работает
getCity()
}
else { 
  navigator.geolocation.getCurrentPosition(success, getCity);
}

function showWeather(data) {
  temp.innerHTML = `${Math.round(data.main.temp)} °C`;
  city.innerHTML = `${data.weather[0].description} в г. ${data.name}`;
  spinner.classList.add('hidden')
}

function getCity() {
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IP_API_KEY}`)
    .then((res) => res.json())
    .then((data) => getWeatherByCity(data.location.city));
}
function getWeatherByCity (city) {
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric&lang=ru`)
.then(function(response){
    return response.json()
})
.then (function (data) {
    showWeather(data)
})
.catch (function (err) {
    console.error(err)
})
}

function success(position) {
  initSpinner();
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  getWeatherByCoords(lat, long)
}

function getWeatherByCoords (lat, long) {  
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OW_API_KEY}&units=metric&lang=ru`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showWeather(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function initSpinner () {
  spinner.classList.remove('hidden')
}

function showSearch() {
  button.classList.add("hidden");
  temp.classList.add("hidden");
  city.classList.add("hidden");
  input.classList.remove("hidden");
  find.classList.remove("hidden");

}
function displayWeather() {
  button.classList.remove("hidden");
  temp.classList.remove("hidden");
  city.classList.remove("hidden");
  input.classList.add("hidden");
  find.classList.add("hidden");
  
}

function findCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric&lang=ru`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showWeather(data);
    })
    .then(() => {
      displayWeather();
    })
    .catch((err) => {
      alert("can't find your city");
    });
}

button.addEventListener("click", () => {
  showSearch();
});
find.addEventListener("click", () => {
  findCity(input.value);
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    initSpinner();
    findCity(input.value);
  }
});