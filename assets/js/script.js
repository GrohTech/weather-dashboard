// function cityWeather() {
// var citySearch = document.querySelector("#city-search").value;
var citySearch = "Milwaukee";
var cityData = document.querySelector("#city-data");
var searchBtn = document.querySelector("#search-btn")
var name = document.querySelector("#name");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");

// searchBtn.addEventListener('click', function(){
     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=733365acf6769a12fdd6beef0019d12f")
    
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var wind = data['wind']['speed'];
        var humidity = data['main']['humidity'];
        // var uvIndex = 

        // cityData.append(response.data.main.temp);
    })
//     .catch(function(err) {
//         alert("Your request did not work.")
//     })
// })

// };
// cityWeather();


// uvi less than 3 = favorable 
// Else if  less than 7 = moderate
// Else severe

// Change from Kelvin to Fahrenheit
// Add imperial units attribute to fetch call

// var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=733365acf6769a12fdd6beef0019d12f"