$(document).ready(function () {

    // Declaring global variables
    let currentDay = moment().format("MMM Do YY");
    let apiKey = "&appid=797daeffdb6701215dfbc71cc3c18753";
    let days = ["Day1", "Day2", "Day3", "Day4", "Day5"];


    // Retrieve weather data from API when City Name is submitted 
    function getWeatherData(cityName) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            cityName +
            apiKey

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Setting data from API for Current day weather 
            let imgIcon = $('<img class="icon">');
            imgIcon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
            let currentFarenheit = (((response.main.temp - 273.15) * 9 / 5) + 32).toFixed();
            let humidity = response.main.humidity
            let windSpeed = response.wind.speed

            // Displaying data from Current day weather
            $("#cityTimeDisplay").text(cityName + " " + "(" + currentDay + ")").append(imgIcon)
            $("#tempDisplay").text("Temp: " + currentFarenheit + " \u00B0F")
            $("#humidityDisplay").text("Humidity: " + humidity + "%")
            $("#windspeedDisplay").text("Wind Speed: " + windSpeed + " Mph")


            //Ajax call to get 5 day forecast data
            let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                response.coord.lat +
                "&lon=" +
                response.coord.lon +
                apiKey

            $.ajax({
                url: oneCallURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)

                // Generate 5 day forecast 
                $('.forecastHeader').text("5 Day Forecast");

                for (let i = 0; i < days.length; i++) {

                    //  Creating elements for 5 day forecast
                    let card = $('<div class="card">');
                    let dayDate = $('<p ="card-title">')
                    let imgClass = $('<img class="icon">');
                    let dayTemp = $('<p = "card-text">')
                    let dayHumidity = $('<p = "card-text">')

                    // Declaring/converting data to created elements 
                    let forecastDay = response.daily[i].dt * 1000;
                    let convertedDate = new Date(forecastDay);
                    forecastDay = convertedDate.toDateString();
                    let humidity = response.daily[i].humidity
                    let dailyIcon = response.daily[i].weather[0].icon
                    let weekFarenheit = ((response.daily[i].temp.day - 273.15) * (9 / 5) + 32).toFixed();

                    // Setting data values 
                    dayDate.text(forecastDay)
                    imgClass.attr("src", "https://openweathermap.org/img/wn/" + dailyIcon + ".png");
                    dayTemp.text("Temp: " + weekFarenheit + " \u00B0F")
                    dayHumidity.text("Humidity: " + humidity + "%")

                    // Appending elements and data 
                    $('#WeekForecast').append(card);
                    card.append(dayDate, imgClass, dayTemp, dayHumidity);
                }

            });
        }

        )
    }
    // Retrieves data after clicking search button 
    $(".btn").on('click', function () {
        cityName = $(this).siblings("#inputValue").val();
        getWeatherData(cityName);
    })

});
