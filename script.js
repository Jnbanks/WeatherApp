// That first acceptance criteria is big. let's break it down.
//  build the html and css to support the page and display the weather data
//    how to fetch data
//    successfully console log an array from open weather api
//      complete the current day box
//        Place the date in the current day box
//        place the temp in the current day box
//         convert that temp to Fahrenheit before displaying it. this was done by adjusting the api call, not by trying to add a function that converts kelvin to fahrenheit lol
//        place the wind in the current day box, then the humidity, then the uv index
//      Complete the five forecast day boxes
//        The icon was the trickiest part of this task. I had to  1) create images in the div tags, 2) find the icon id in the fetched object, 3) Insert the icon id into the icon image url, 4) Insert the fetched image into the div to display on the webpage 
//      Add the city name to the search history column beneath the search button
//   determine the uv index element box color depending on favorable, moderate or severe

//Declare variables:
//Current Day Element
const searchBtn = document.querySelector('#search-btn');
const cityDate = document.querySelector('#city-date');
const todaysDate = moment().format('(M/D/YYYY)');
const todayTemp = document.querySelector('#temp');
const todayWind = document.querySelector('#wind');
const todayHumidity = document.querySelector('#humidity');
const todayUv = document.querySelector('#uv');
//History column
const searchHistory = document.querySelector('#search-history');
//Forecast variables
//  dates
const f1date = document.querySelector('#forecast1 .date');
const f2date = document.querySelector('#forecast2 .date');
const f3date = document.querySelector('#forecast3 .date');
const f4date = document.querySelector('#forecast4 .date');
const f5date = document.querySelector('#forecast5 .date');
//  icons
const f1icon = document.querySelector('#forecast1 .icon');
const f2icon = document.querySelector('#forecast2 .icon');
const f3icon = document.querySelector('#forecast3 .icon');
const f4icon = document.querySelector('#forecast4 .icon');
const f5icon = document.querySelector('#forecast5 .icon');
//  temp
const f1temp = document.querySelector('#forecast1 .temp');
const f2temp = document.querySelector('#forecast2 .temp');
const f3temp = document.querySelector('#forecast3 .temp');
const f4temp = document.querySelector('#forecast4 .temp');
const f5temp = document.querySelector('#forecast5 .temp');
//  wind
const f1wind = document.querySelector('#forecast1 .wind');
const f2wind = document.querySelector('#forecast2 .wind');
const f3wind = document.querySelector('#forecast3 .wind');
const f4wind = document.querySelector('#forecast4 .wind');
const f5wind = document.querySelector('#forecast5 .wind');
//  humidity
const f1humidity = document.querySelector('#forecast1 .humidity');
const f2humidity = document.querySelector('#forecast2 .humidity');
const f3humidity = document.querySelector('#forecast3 .humidity');
const f4humidity = document.querySelector('#forecast4 .humidity');
const f5humidity = document.querySelector('#forecast5 .humidity');


function fetchCityDeets() {
  //Create variables for city API weather fetch
  const weatherKey = "3d9956d2d042c8cf613c82d30cf3b4d2";
  let city = document.querySelector('#city-input').value;
  let queryURLCity = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherKey;
  let queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&units=imperial&limit=1&appid=' + weatherKey;
  //Create variables for history column
  const searchedCity = document.createElement("div");
  //remove the previously appended weather icon so you don't get weather icons accumulating after each search
  f1icon.innerHTML = '';
  f2icon.innerHTML = '';
  f3icon.innerHTML = '';
  f4icon.innerHTML = '';
  f5icon.innerHTML = '';
  
  fetch(queryURLCity)
  .then(function(resp) { 
    if (resp.status === 404) {
      return resp.json()
      //event.preventDefault;
      //alert('not a valid city name')
    } else {
      searchedCity.textContent = city;
      searchHistory.appendChild(searchedCity);
    }
      return resp.json() }) // Convert data to json
    .then(function(data){
      //console.log(data);
      cityDate.textContent = data.name + ' ' + todaysDate;
      todayTemp.textContent = 'Temp: ' + data.main.temp + ' \xB0 F';
      todayWind.textContent = 'Wind: ' + data.wind.speed + 'mph';
      todayHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
      //the api fetch by city name did not include the uv index, but the latitude-and-longitude-based fetch includes all the info that I need. So what I think needs to be done is a fetch which gets the lat and long, and then use those numbers in a new fetch which can get all the information that I need. 
    })
    fetch(queryURL)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      //console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      //This fetch below should give me the five day forecast and uv index
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+weatherKey)
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data){
        console.log(data);
        console.log(city);
        const uvIndex = data.current.uvi;
        todayUv.textContent = 'UV Index: ' + uvIndex;
        //Set the background color of the uv element depending on severity of the uv index
        if (uvIndex >= 0 && uvIndex < 2) {
          todayUv.style.backgroundColor = 'green';
        } else if (uvIndex >= 2 && uvIndex < 8) {
          todayUv.style.backgroundColor = 'yellow';
        } else if (uvIndex >= 8) {
          todayUv.style.backgroundColor = 'red';
        }
        //forecast dates
        f1date.textContent = moment(data.daily[1].dt * 1000).format('M/D/YYYY');
        f2date.textContent = moment(data.daily[2].dt * 1000).format('M/D/YYYY');
        f3date.textContent = moment(data.daily[3].dt * 1000).format('M/D/YYYY');
        f4date.textContent = moment(data.daily[4].dt * 1000).format('M/D/YYYY');
        f5date.textContent = moment(data.daily[5].dt * 1000).format('M/D/YYYY');
        //Forecast Icons
        //  1) Create images inside the div tags
        const icon1 = document.createElement("img");
        const icon2 = document.createElement("img");
        const icon3 = document.createElement("img");
        const icon4 = document.createElement("img");
        const icon5 = document.createElement("img");
        //  2) Find the icon id in the fetched object
        const icon1a = data.daily[1].weather[0].icon;
        const icon2a = data.daily[2].weather[0].icon;
        const icon3a = data.daily[3].weather[0].icon;
        const icon4a = data.daily[4].weather[0].icon;
        const icon5a = data.daily[5].weather[0].icon;
        //  3) Insert the icon id into the icon image url
        icon1.src = 'http://openweathermap.org/img/wn/'+icon1a+'@2x.png';
        icon2.src = 'http://openweathermap.org/img/wn/'+icon2a+'@2x.png';
        icon3.src = 'http://openweathermap.org/img/wn/'+icon3a+'@2x.png';
        icon4.src = 'http://openweathermap.org/img/wn/'+icon4a+'@2x.png';
        icon5.src = 'http://openweathermap.org/img/wn/'+icon5a+'@2x.png';
        //  4) Finally, insert the fetched image into the div to display on the webpage
        f1icon.appendChild(icon1);
        f2icon.appendChild(icon2);
        f3icon.appendChild(icon3);
        f4icon.appendChild(icon4);
        f5icon.appendChild(icon5);
        //Forecast Temp
        f1temp.textContent = 'Temp: ' + data.daily[1].temp.day + ' \xB0 F';
        f2temp.textContent = 'Temp: ' + data.daily[2].temp.day + ' \xB0 F';
        f3temp.textContent = 'Temp: ' + data.daily[3].temp.day + ' \xB0 F';
        f4temp.textContent = 'Temp: ' + data.daily[4].temp.day + ' \xB0 F';
        f5temp.textContent = 'Temp: ' + data.daily[5].temp.day + ' \xB0 F';
        //Forecast Wind
        f1wind.textContent = 'Wind: ' + data.daily[1].wind_speed + 'mph';
        f2wind.textContent = 'Wind: ' + data.daily[2].wind_speed + 'mph';
        f3wind.textContent = 'Wind: ' + data.daily[3].wind_speed + 'mph';
        f4wind.textContent = 'Wind: ' + data.daily[4].wind_speed + 'mph';
        f5wind.textContent = 'Wind: ' + data.daily[5].wind_speed + 'mph';
        //Forecast Humidity
        f1humidity.textContent = 'Humidity: ' + data.daily[1].humidity + '%';
        f2humidity.textContent = 'Humidity: ' + data.daily[2].humidity + '%';
        f3humidity.textContent = 'Humidity: ' + data.daily[3].humidity + '%';
        f4humidity.textContent = 'Humidity: ' + data.daily[4].humidity + '%';
        f5humidity.textContent = 'Humidity: ' + data.daily[5].humidity + '%';
      })
  })
}
searchBtn.addEventListener('click', fetchCityDeets);
