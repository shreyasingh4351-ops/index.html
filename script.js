const weatherDiv = document.getElementById("weather")
const loading = document.getElementById("loading")


const cities = [
{ name: "Delhi", lat: 28.61, lon: 77.23 },
{ name: "London", lat: 51.50, lon: -0.12 },
{ name: "Tokyo", lat: 35.67, lon: 139.65 }
]


function getWeather(city){

let url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`

return fetch(url)
.then(function(res){
return res.json()
})
.then(function(data){

return {
city: city.name,
temp: data.current_weather.temperature,
code: data.current_weather.weathercode
}

})

}


function getEmoji(code){

if(code == 0) return "☀️"
if(code <=3) return "🌤"
if(code <=48) return "☁️"
if(code <=67) return "🌧"
return "⛈"

}


function loadWeather(){

let promises = cities.map(function(city){
return getWeather(city)
})

Promise.all(promises)
.then(function(results){

loading.style.display="none"

results.forEach(function(item){

let card = document.createElement("div")
card.className="card"

card.innerHTML = `
<h3>${item.city}</h3>
<p>${item.temp}°C</p>
<p>${getEmoji(item.code)}</p>
`

weatherDiv.appendChild(card)

})

})
.catch(function(){

loading.innerText="Something went wrong"

})

}

loadWeather()
