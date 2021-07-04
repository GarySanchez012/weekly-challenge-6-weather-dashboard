var weatherBase = "https://api.openweathermap.org/data/2.5/weather?q=";
//make sure you change api key back to yours after it activates
var apiKey = "&units=imperial&appid=6260169909dd4d4630bd110c87fff970";
var cityName = "Stamford";
var displayCity = document.querySelector("#displayCity");
var displayDate = document.querySelector("#displayDate");
var displayImg = document.queryCommandEnabled("#staticImg");
var displayTemp = document.querySelector("#displayTemp");
var displayWind = document.querySelector("#displayWind");
var displayHumidity = document.querySelector("#displayHumidity");
var displayUVIndex = document.querySelector("#displayUVIndex");
var submitBtn = document.querySelector(".submitBtn");
var submitInput = document.querySelector(".submitInput");
var city = "";
var fiveDay = document.querySelector(".five-day");
var searchHistory = document.querySelector(".searchHistory");
var date = moment().format("MM/D/YYYY");

fetch(weatherBase + cityName + apiKey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      console.log(data);
    displayData(data);
});

//display data
var displayData = function (data) {
    displayCity.textContent = data.name;
    displayDate.textContent = date;
    var displayImg = document.createElement("img")
    displayImg.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    displayCity.append(displayImg);
    displayTemp.textContent = data.main.temp + " f";
    displayWind.textContent = data.wind.speed + " mph";
    displayHumidity.textContent = data.main.humidity + " %";
    
};

var displayUVI =
"https://api.openweathermap.org/data/2.5/onecall?lat=" +
"41.053429" +
"&lon=" +
"-73.538734" +
"&exclude=minutely,hourly,alerts" +
apiKey;

fetch(displayUVI)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    
    displayUV(data);
});

var displayUV = function(data) {
    displayUVIndex.textContent = "UV: " + data.current.uvi;
    // displayImg.setAttribute("src", "https://api.openweathermap.org/img/w/" + data.current.weather[0].icon + ".png")
}

submitBtn.addEventListener("click", function (event) {
    city = submitInput.value
  event.preventDefault();
  searchResults();
    saveHistory();

});

var searchResults = function () {
  var city = submitInput.value;
  fetch(weatherBase + city + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCity.textContent = data.name;
      displayTemp.textContent = "temp: " + data.main.temp + " f";
      displayWind.textContent = "wind: " + data.wind.speed + " mph";
      displayHumidity.textContent = "humidity: " + data.main.humidity + " %";
        var displayImg = document.createElement("img")
    displayImg.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    displayCity.append(displayImg);
      fiveDayForecast(data.coord.lat, data.coord.lon);
    });
};

var fiveDayForecast = function (lat, lon) {
  var fiveDayAPI =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts" +
    apiKey;

  fetch(fiveDayAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      showFiveDayForecast(data);
    });
};

var showFiveDayForecast = function (data) {
  fiveDay.innerHTML = "";
  for (let i = 0; i < 5; i++) {
      var forecastDate = moment().add(i + 1, "days").format("MM/D/YYYY");
    var forecastBlock = document.createElement("div");
    var dateBlock = document.createElement("h3");
    var imgBlock = document.createElement("img");
    var tempBlock = document.createElement("p");
    var windBlock = document.createElement("p");
    var humidityBlock = document.createElement("p");
    var uvBlock = document.createElement("p");

    forecastBlock.setAttribute("id", "day");
    imgBlock.setAttribute(
      "src",
      "https://api.openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png"
    );

    dateBlock.textContent = forecastDate;
    tempBlock.textContent = "temp: " + data.daily[i].temp.day + " f";
    windBlock.textContent = "wind: " + data.daily[i].wind_speed + " mph";
    humidityBlock.textContent = "humidity: " + data.daily[i].humidity + " %";
    uvBlock.textContent = "UVI: " + data.daily[i].uvi;

    fiveDay.append(forecastBlock);
    forecastBlock.append(
      dateBlock,
      imgBlock,
      tempBlock,
      windBlock,
      humidityBlock,
      uvBlock
    );
  }
};

var oldSearch = [];

var saveHistory = function() {
    city = submitInput.value;
    dataSave = {
        text: city
    };

    oldSearch.push(dataSave);
    localStorage.setItem("text", JSON.stringify(oldSearch))
    };

var loadHistory = function() {
    loadEl = JSON.parse(localStorage.getItem("text"))
    for (let i = 0; i < loadEl.length; i++) {
        var cityList = document.createElement("li");
        cityList.setAttribute("class", "history-list");
        cityList.textContent = loadEl[i].text;
        
        searchHistory.append(cityList);
    }
}

loadHistory();