var input = "bridgewater"
var fiveDay = document.getElementById("five_day")

var citySearch = document.getElementById("citySearch")
var currentName = ""
var searchBtn = document.getElementById("searchBtn")
var displayArea = document.getElementById("displayArea")
let savedCities = localStorage.getItem('savedCities') ? JSON.parse(localStorage.getItem('savedCities')) : []

function getAPI(input) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&cnt=5" + "&units=imperial" + "&appid=" + myKey)

        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            return data
        })
        .then(function (data) {


            fiveDay.textContent = "";
            for (let i = 0; i < data.list.length; i++) {
                // console.log(data.list);
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
    fetchingCurrentLocation(citySearch)
})

// temp wind humidity

function fetchingCurrentLocation(citySearch) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            return data;

        }).then(function (data) {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            currentName = data.name
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + myKey + "&units=imperial")

                .then(function (response) {
                    return response.json();
                })

                .then(function (data) {
                    console.log(data)
                    var humidity = document.createElement('h3')
                    var wind = document.createElement('h3')
                    var cityName = document.createElement('h1')
                    var temperature = document.createElement('h3')
                    var uvData = document.createElement('h3')
                    humidity.textContent = data.current.humidity
                    var dateConversion = new Date(data.current.dt * 1000).toLocaleString();
                    wind.textContent = data.current.wind_speed
                    cityName.textContent = currentName + " " + dateConversion
                    temperature.textContent = data.current.temp
                    uvData.textContent = data.current.uvi

                    if (data.current.uvi < 2) {
                        uvData.classList.add("greenBox")
                    }
                    else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                        uvData.classList.add("yellowBox")
                    }
                    else if (data.current.uvi > 5 && data.current.uvi <= 7)
                        uvData.classList.add("orangeBox")
                    else if (data.current.uvi > 7 && data.current.uvi <= 10) {
                        uvData.classList.add("redBox")

                    }
                    else {
                        uvData.classList.add("purpleBox")
                    }



                    displayArea.appendChild(cityName)
                    displayArea.appendChild(temperature)
                    displayArea.appendChild(wind)
                    displayArea.appendChild(humidity)
                    displayArea.appendChild(uvData)


                })


        })
}





