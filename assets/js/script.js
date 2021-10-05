
// var citySearch = "Milwaukee";
var cityData = document.querySelector("#city-data");
var searchBtn = document.querySelector("#search-btn")
var cityName = document.querySelector("#city-name");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");
var uvBackground = document.querySelector(".uv-background");
var date = document.querySelector("#date");
var date1 = document.querySelector("#date1"); 
var date2 = document.querySelector("#date2");
var date3 = document.querySelector("#date3");
var date4 = document.querySelector("#date4");
var date5 = document.querySelector("#date5");
var recentCities = JSON.parse(window.localStorage.getItem("cities")) || [];

// Display date
var currentDate = moment().format('MM/DD/YYYY');
date.append(currentDate);

var displayDate1 = moment().add(1,'days').format('MM/DD/YYYY');
var displayDate2 = moment().add(2,'days').format('MM/DD/YYYY');
var displayDate3 = moment().add(3,'days').format('MM/DD/YYYY');
var displayDate4 = moment().add(4,'days').format('MM/DD/YYYY');
var displayDate5 = moment().add(5,'days').format('MM/DD/YYYY');


// Search for a city
searchBtn.addEventListener('click', function(event){
    var citySearch = document.querySelector("#city-search").value;
    recentCities.push(citySearch);
    localStorage.setItem("cities", JSON.stringify(recentCities));
    previousCities();

     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=733365acf6769a12fdd6beef0019d12f&units=imperial")
    .then(function(response) {
        return response.json();
    })
    // Display city weather data
    .then(function(data) {
        console.log(data);

        // Display weather icon
        var weatherIconContainer = document.querySelector("#weather-icon-container");
        var weatherIcon = document.createElement("img");
        var getIcon = data.weather[0].icon;
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + getIcon + "@2x.png");
        weatherIcon.style.width="60px";
        weatherIcon.style.height="60px";
        weatherIconContainer.append(weatherIcon);

        // Display temp, wind, hum, UVI
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var windValue = data['wind']['speed'];
        var humidityValue = data['main']['humidity'];
        // var uvIndexValue = 

        cityName.innerHTML = nameValue;
        temp.innerHTML = tempValue + " °F";
        wind.innerHTML = windValue + " mph";
        humidity.innerHTML = humidityValue + "%";
        // uvIndex.innerHTML = uvIndexValueValue;
        getUvIndex(data);
        fiveDay();
    })
    .catch(function(error) {
        alert("Your request did not work.")
    })



    // Display color-coded UV Index
    function getUvIndex(data){
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(lat);
        console.log(lon);
        // var citySearch = document.querySelector("#city-search").value;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=733365acf6769a12fdd6beef0019d12f&units=imperial&exclude=minutely&exclude=hourly")
       .then(function(response) {
           return response.json();
       })
       // Display city weather data
       .then(function(data) {
           console.log(data);            
            var uviData = data.current.uvi;
            uvIndex.innerHTML = uviData;
         // uvi less than 3 = favorable 
            // Else if  less than 7 = moderate
            // Else severe
            if(uviData < 3){
                uvBackground.style.backgroundColor="green";
            }
            else if(uviData< 7){
                uvBackground.style.backgroundColor="yellow";
            }
            else{
                uvBackground.style.backgroundColor="red";
            }
       })
       .catch(function(error) {
           alert("Your request did not work.")
           console.log(error);
       })
   }    



// Display 5-day weather data
    function fiveDay(){
        fetch("https:api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=733365acf6769a12fdd6beef0019d12f&units=imperial")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // Display dates
            date1.append(displayDate1);
            date2.append(displayDate2);
            date3.append(displayDate3);
            date4.append(displayDate4);
            date5.append(displayDate5);

            // Display 5-day weather data
            fiveDayPopulate(1, data.list[6]);
            fiveDayPopulate(2, data.list[14]);
            fiveDayPopulate(3, data.list[22]);
            fiveDayPopulate(4, data.list[30]);
            fiveDayPopulate(5, data.list[38]);

            
            
            

        })
        .catch(function(error) {
            alert("Your request did not work.")
            console.log(error);
        })
    }
});

function fiveDayPopulate(date,data){
    var futureDate = "#day" + date;
    var day1 = document.querySelector(futureDate);

    // Display weather icons
    var weatherIcon = document.createElement("img");
    var getIcon = data.weather[0].icon;
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + getIcon + "@2x.png");
    weatherIcon.style.width="50px";
    weatherIcon.style.height="50px";
    day1.append(weatherIcon);

    // Display temp, wind, humidity
    var tempData = document.createElement("p");
    tempData.innerHTML = "<strong>Temperature:</strong> " + data.main.temp + "°F";
    day1.append(tempData);
    var windData = document.createElement("p");
    windData.innerHTML = "<strong>Wind Speed:</strong> " + data.wind.speed + " mph";
    day1.append(windData);
    var humData = document.createElement("p");
    humData.innerHTML = "<strong>Humidity:</strong> " + data.main.humidity + "%";
    day1.append(humData);
    
    console.log(weatherIcon);
};
 
function previousCities() {
    var pastCities = document.querySelector("#recent-cities");
    console.log(recentCities);
    for(var i=0; i < recentCities.length; i++){
        var cityButton = document.createElement("button");
        cityButton.innerText = recentCities[i];
        pastCities.append(cityButton);
        console.log(recentCities[i]);
    }

}
previousCities();     
            

        