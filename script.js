//declare variables:
const weatherKey = "3d9956d2d042c8cf613c82d30cf3b4d2";
let city;
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherKey;
const searchBtn = document.querySelector('#search-btn');


//fetch(queryURL);


const today = document.querySelector('#city-date');
const todayTemp = document.querySelector('#temp');
const todayWind = document.querySelector('#wind');
const todayHumidity = document.querySelector('#humidity');
const todayUv = document.querySelector('#uv');


function displayWeather(){
// today.innerHTML = 
// todayTemp.innerHTML = 
// todayWind.innerHTML =
// todayHumidity.innerHTML = 
// todayUv.innerHTML = 
}

//I don't know if I need : '', after the object items, or if I can just put a comma after their names. city, vs city: '',
// const weather = {
//     city: '',
//     date,
//     temperature,
//     wind,
//     humidity,
//     uv,
// };

//Below is kind of how you can get the city user input and store in local storage

// city = localStorage.getItem("#city-input");

// city-input.textContent = city;

// searchCity.addEventListener("click", function() {
//     if ()
//     fetch(queryURL)
    
// }
//Use the below format for calling cities by name
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}