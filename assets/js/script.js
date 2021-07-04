var weatherBase = "https://api.openweathermap.org/data/2.5/weather?q=";
//make sure you change api key back to yours after it activates
var apiKey = "&units=imperial&appid=6260169909dd4d4630bd110c87fff970";
var cityName = "Stamford";
var displayCity = document.querySelector("#displayCity");
var displayDate = document.querySelector("#displayDate");
var displayTemp = document.querySelector("#displayTemp");
var displayWind = document.querySelector("#displayWind");
var displayHumidity = document.querySelector("#displayHumidity");
var displayUVIndex = document.querySelector("#displayUVIndex");
var submitBtn = document.querySelector(".submitBtn");
var submitInput = document.querySelector(".submitInput");
var city = "";

fetch(weatherBase + cityName + apiKey)
.then(function (response) {
    return response.json();
})
.then(function (data) {
     displayData(data);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
        searchResults();
})

//display data
var displayData = function (data) {
  displayCity.textContent = data.name;
  displayTemp.textContent = data.main.temp + " f";
  displayWind.textContent = data.wind.speed + " mph";
  displayHumidity.textContent = data.main.humidity + " %";
};

var searchResults = function () {
    var city = submitInput.value;
    fetch(weatherBase + city + apiKey)
        .then(function (response) {
        return response.json();
  })
        .then(function (data) {
            displayCity.textContent = data.name;
            displayTemp.textContent = data.main.temp + " f";
            displayWind.textContent = data.wind.speed + " mph";
            displayHumidity.textContent = data.main.humidity + " %";

            fiveDayForecast(data.coord.lat, data.coord.lon);
  })
};

var fiveDayForecast = function(lat, lon) {
    var fiveDayAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts" + apiKey
    
    fetch(fiveDayAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
         console.log(data);

         showFiveDayForecast(data);
    });
}

var showFiveDayForecast = function(data) {
    
}