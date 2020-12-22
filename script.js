$(document).ready(function () {
    let currentDay = moment().format('L');
    var apiKey = "appid=797daeffdb6701215dfbc71cc3c18753";
   
    // var userInput = "tempe";
    let days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

    

    // Retrieve weather data from API when City Name is submitted 
    function getWeatherData(cityName) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=797daeffdb6701215dfbc71cc3c18753"


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            let temperature = response.main.temp
            let humidity = response.main.humidity
            let windSpeed = response.wind.speed
            let icon = response.weather[0].icon


            $("#cityTimeDisplay").text(cityName + " " + currentDay)
            $("#tempDisplay").text("Temperature: " + temperature)
            $("#humidityDisplay").text("Humidity: " + humidity)
            $("#windspeedDisplay").text("Wind Speed: " + windSpeed)


            console.log(response)


            // Generate 5 day forecast 
            $('#WeekForecast').text("5 Day Forecast");

            for (let i = 0; i < days.length; i++) {

                let card = $('<div class="card">');
                let dayDate = $('<p ="card-title">')
                let dayIcon = $('<img>')
                let dayTemp = $('<p = "card-text">')
                let dayHumidity = $('<p = "card-text">')

                dayDate.text(currentDay)
                dayIcon.text('icon')
                dayTemp.text(temperature)
                dayHumidity.text(humidity)

                $('#WeekForecast').append(card);
                card.append(dayDate, dayIcon, dayTemp, dayHumidity);
            }

        });
    }


    // Retrieves data after clicking search button 
    $(".btn").on('click', function () {
        cityName = $(this).siblings("#inputValue").val();
        getWeatherData(cityName);
    })

});
