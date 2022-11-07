// var input = "bridgewater"
var fiveDay = document.getElementById("five_day")

var citySearch = document.getElementById("citySearch")

var searchBtn = document.getElementById("searchBtn")
var displayArea = document.getElementById("displayArea")


function getAPI(input) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&cnt=5" + "&units=imperial" + "&appid=" + myKey)

        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data
        })
        .then(function (data) {
            var displayAreaHumidtyH1 = document.createElement("h1")
            var displayAreaDateH1 = document.createElement("h1")
            var displayAreaWindH1 = document.createElement("h1")
            var displayAreaCityName = document.createElement("h1")
            var displayAreaCity = data.city.name
            var displayAreaDate = data.list[0].dt_txt
            var displayAreaWindSpeed = data.list[0].wind.speed
            var displayAreaHumidity = data.list[0].main.humidity
            displayAreaCityName.textContent = displayAreaCity
            displayAreaDateH1.textContent = displayAreaDate
            displayAreaWindH1.textContent = displayAreaWindSpeed
            displayAreaHumidtyH1.textContent = displayAreaHumidity
            displayArea.appendChild(displayAreaHumidtyH1)
            displayArea.appendChild(displayAreaWindH1)
            displayArea.appendChild(displayAreaDateH1)
            displayArea.appendChild(displayAreaCityName)


            fiveDay.textContent = "";
            for (let i = 0; i < data.list.length; i++) {
                console.log(data.list);
                // var date = data.list[i].dt_txt
                // var humidity = data.list[i].main.humidity
                // var windSpeed = data.list[i].wind.speed
                // console.log(date + " " + humidity + " " + windSpeed)
                // http://openweathermap.org/img/wn/${icon}.png`
                var test = data.list[i].weather[0].icon;

                var div = document.createElement('div');
                div.innerHTML =
                    `<div class="card m-2" style = "width: 12rem;">
                    <img class="card-img-top" style="width: 50px; height: 50px;" src="http://openweathermap.org/img/wn/${test}.png" alt="${data.list[i].weather[0].description}">
                    <div class="card-body">
                    <h5 class="card-title">Temperature: ${data.list[i].main.temp}</h5>
                    <p class="card-text"> Humidity: ${data.list[i].main.humidity}</p>
                    <p class="card-text">Wind Speed: ${data.list[i].wind.speed}</p>
                    </div>
                </div>`;

                fiveDay.append(div);
            }
        })
}
// getAPI(input)

searchBtn.addEventListener("click", function () {
    var citySearch = document.getElementById("citySearch").value
    getAPI(citySearch)
})

// temp wind humidity