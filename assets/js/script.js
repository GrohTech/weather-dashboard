
// var citySearch = "Milwaukee";
var cityData = document.querySelector("#city-data");
var searchBtn = document.querySelector("#search-btn")
var cityName = document.querySelector("#city-name");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");
var date = document.querySelector("#date");
// var day2 = document.querySelector("#day2");
// var day3 = document.querySelector("#day3");
// var day4 = document.querySelector("#day4");
// var day5 = document.querySelector("#day5");

// Display date
currentDate = moment().format('MM/DD/YYYY');
date.append(currentDate);

searchBtn.addEventListener('click', function(){
    var citySearch = document.querySelector("#city-search").value;
     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=733365acf6769a12fdd6beef0019d12f&units=imperial")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var windValue = data['wind']['speed'];
        var humidityValue = data['main']['humidity'];
        // var uvIndexValue = 

        cityName.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        wind.innerHTML = windValue;
        humidity.innerHTML = humidityValue;
        // uvIndex.innerHTML = uvIndexValueValue;
        fiveDay();
    })
    .catch(function(error) {
        alert("Your request did not work.")
        console.log(citySearch);
    })

    function fiveDay(){
        fetch("https:api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=733365acf6769a12fdd6beef0019d12f&units=imperial")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
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
    var item1 = day1.append(data.main.temp);
    var item2 = day1.append(data.wind.speed);
    var item3 = day1.append(data.main.humidity);

    // var value1 = item1.value;
    // var value2 = item2.value;
    // var value3 = item3.value;
    // value1.style.display= "block";
    // value2.style.display= "block";
    // value3.style.display= "block";
    // console.log(futureDate);
}


// uvi less than 3 = favorable 
// Else if  less than 7 = moderate
// Else severe

// Change from Kelvin to Fahrenheit
// Add imperial units attribute to fetch call

// var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=733365acf6769a12fdd6beef0019d12f"