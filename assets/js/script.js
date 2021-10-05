
// var citySearch = "Milwaukee";
var cityData = document.querySelector("#city-data");
var searchBtn = document.querySelector("#search-btn")
var cityName = document.querySelector("#city-name");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");
var date = document.querySelector("#date");
var date1 = document.querySelector("#date1"); 
var date2 = document.querySelector("#date2");
var date3 = document.querySelector("#date3");
var date4 = document.querySelector("#date4");
var date5 = document.querySelector("#date5");


// Display date
var currentDate = moment().format('MM/DD/YYYY');
date.append(currentDate);

var displayDate1 = moment().add(1,'days').format('MM/DD/YYYY');
var displayDate2 = moment().add(2,'days').format('MM/DD/YYYY');
var displayDate3 = moment().add(3,'days').format('MM/DD/YYYY');
var displayDate4 = moment().add(4,'days').format('MM/DD/YYYY');
var displayDate5 = moment().add(5,'days').format('MM/DD/YYYY');


// Search for a city
searchBtn.addEventListener('click', function(){
    var citySearch = document.querySelector("#city-search").value;
     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=733365acf6769a12fdd6beef0019d12f&units=imperial")
    .then(function(response) {
        return response.json();
    })
    // Display city weather data
    .then(function(data) {
        console.log(data);
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
        
        fiveDay();
    })
    .catch(function(error) {
        alert("Your request did not work.")
        console.log(citySearch);
    })

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
    weatherIcon.setAttribute("href", "http://openweathermap.org/img/wn/" + getIcon + "@2x.png");
    weatherIcon.style.width="25px";
    weatherIcon.style.height="25px";
    day1.append(weatherIcon);

    // Display temp, wind, humidity
    var tempData = document.createElement("p");
    tempData.innerText = "Temperature: " + data.main.temp + "°F";
    day1.append(tempData);
    var windData = document.createElement("p");
    windData.innerText = "Wind Speed: " + data.wind.speed + " mph";
    day1.append(windData);
    var humData = document.createElement("p");
    humData.innerText = "Humidity: " + data.main.humidity + "%";
    day1.append(humData);
    
    console.log(weatherIcon);
};
 


 

            // uvi less than 3 = favorable 
            // Else if  less than 7 = moderate
            // Else severe
            
            // Change from Kelvin to Fahrenheit
            // Add imperial units attribute to fetch call
            
            // var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=733365acf6769a12fdd6beef0019d12f"
            
            

        