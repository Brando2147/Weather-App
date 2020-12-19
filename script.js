$(document).ready(function () {

    var apiKey = "appid=797daeffdb6701215dfbc71cc3c18753";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=tempe&appid=797daeffdb6701215dfbc71cc3c18753"
    var userInput = "tempe";
    let days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let temperature = response.main.temp
        let humidity = response.main.humidity
        let windSpeed = response.wind.speed
        let icon = response.weather[0].icon


        console.log(response)

        $('h3.city').text()
        $('p.temp').text(temperature)
        $('p.humidity').text(humidity)
        $('p.windspeed').text(windSpeed)


        // Generate 5 day forecase 
        $('#WeekForecast').text("5 Day Forecast");

        for (let i = 0; i < days.length; i++) {

            let card = $('<div class="card">');
            let dayDate = $('<p ="card-title">')
            let dayIcon = $('<img>')
            let dayTemp = $('<p = "card-text">')
            let dayHumidity = $('<p = "card-text">')

            dayDate.text('date')
            dayIcon.text('icon')
            dayTemp.text(temperature)
            dayHumidity.text(humidity)

            $('#WeekForecast').append(card);
            card.append(dayDate, dayIcon, dayTemp, dayHumidity);

        }



    });



});
