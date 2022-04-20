// That first acceptance criteria is big. let's break it down.
// build the html and css to support the page
// how to fetch data
//  successfully console log an array from open weather api
//  Place the date in the current day box
//  place the temp in the current day box
//    convert that temp to Fahrenheit before displaying it. this was done by adjusting the api call, not by trying to add a function that converts kelvin to fahrenheit lol
//  place the wind in the current day box  

//declare variables:
const searchBtn = document.querySelector('#search-btn');
const cityDate = document.querySelector('#city-date');
const todaysDate = moment().format('MMM Do, YYYY');
const todayTemp = document.querySelector('#temp');
const todayWind = document.querySelector('#wind');
const todayHumidity = document.querySelector('#humidity');
const todayUv = document.querySelector('#uv');

function fetchCityDeets() {
    const weatherKey = "3d9956d2d042c8cf613c82d30cf3b4d2";
    let city = document.querySelector('#city-input').value;
    //let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherKey;
    let queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&units=imperial&limit=1&appid=' + weatherKey;
    fetch(queryURL)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      //the api fetch by city name did not include the uv index, but the lat an long includes everything. So what I think needs to be done is a fetch which gets the lat and long, and then use those numbers in a new fetch which can get all the information that I need. 
      console.log(data);
      console.log(city);
      const lat = data[0].lat;
      const lon = data[0].lon;
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid='+weatherKey)
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data){
        console.log(data);
        //console.log(city);
      })
    //cityDate.textContent = data.name + ' ' + todaysDate;
    //todayTemp.textContent = 'Temp: ' + data.main.temp + ' \xB0 F';
    //todayWind.textContent = 'Wind: ' + data.wind.speed + 'mph';
    //todayHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    //todayUv.textContent = 'UV Index: ' + data.
  })
}
searchBtn.addEventListener('click', fetchCityDeets);

//fetch(queryURL);


// let today = document.querySelector('#city-date');
// let todayTemp = document.querySelector('#temp');
// let todayWind = document.querySelector('#wind');
// let todayHumidity = document.querySelector('#humidity');
// let todayUv = document.querySelector('#uv');


//function displayWeather(){
// today.innerHTML = 
// todayTemp.innerHTML = 
// todayWind.innerHTML =
// todayHumidity.innerHTML = 
// todayUv.innerHTML = 
//}

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
