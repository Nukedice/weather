function showWeather (data)  {
    const temp = document.querySelector ('.temp');
    const city = document.querySelector ('.city');
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
        console.log(data)
    }).catch(function (err) {
        console.log(err)
    })
})
console.log(lat +' 00asd ' + long)