var input = "bridgewater"
var fiveDay = document.getElementById("five_day")

var citySearch = document.getElementById("citySearch")
var currentName = ""
var searchBtn = document.getElementById("searchBtn")
var displayArea = document.getElementById("displayArea")
let savedCities = localStorage.getItem('savedCities') ? JSON.parse(localStorage.getItem('savedCities')) : []
let localStorageItems = document.getElementById('localStorageItems')
for (let i = 0; i < savedCities.length; i++) {
    createCityButtonsStorage(savedCities[i])

}
function getAPI(input) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&cnt=5" + "&units=imperial" + "&appid=" + myKey)

        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            if (data.cod === "404") {
                NotACity()

            }
            else {
                validateCity(data.name)
            }
            return data
        })

        .then(function (data) {
            fiveDay.textContent = "";
            for (let i = 0; i < data.list.length; i++) {

                var test = data.list[i].weather[0].icon;

                var div = document.createElement('div');
                div.innerHTML =
                    `<div class="card m-2 bg-primary" style = "width: 12rem;">
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
    if (citySearch === "") {
        NotACity()
        return

    }
    else {

        getAPI(citySearch)
        fetchingCurrentLocation(citySearch)
    }
})

// temp wind humidity

function fetchingCurrentLocation(citySearch) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (data.cod === "404") {
                NotACity()

            }
            else {
                validateCity(data.name)
            }
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
                    displayArea.textContent = ""
                    console.log(data)
                    var humidity = document.createElement('h3')
                    var wind = document.createElement('h3')
                    var cityName = document.createElement('h1')
                    var temperature = document.createElement('h3')
                    var uvData = document.createElement('h3')
                    var img = document.createElement("img")
                    humidity.textContent = data.current.humidity
                    var dateConversion = new Date(data.current.dt * 1000).toLocaleString();
                    wind.textContent = data.current.wind_speed
                    cityName.textContent = currentName + " " + dateConversion
                    temperature.textContent = data.current.temp
                    uvData.textContent = data.current.uvi
                    uvData.style.width = "4%"
                    var icon = data.current.weather[0].icon

                    let displayIcon = `http://openweathermap.org/img/wn/${icon}.png`
                    img.src = displayIcon;

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
                    displayArea.appendChild(img)
                    displayArea.appendChild(temperature)
                    displayArea.appendChild(wind)
                    displayArea.appendChild(humidity)
                    displayArea.appendChild(uvData)


                })


        })
}





function validateCity(data) {
    let city = document.querySelector('#citySearch').value


    if (localStorage.getItem('savedCities')) {

        savedCities = JSON.parse(localStorage.getItem('savedCities'))
    }

    let flag = false;
    for (let i = 0; i < savedCities.length; i++) {
        if (savedCities[i] === city) {

            flag = true;
            break;

        }


    }

    if (flag === false && city !== "") {
        savedCities.push(city)
        localStorage.setItem('savedCities', JSON.stringify(savedCities))
        createCityButtonsStorage(city)
        console.log(city)
    }

    return data;

}


function NotACity() {
    alert("This City doesn't exist")

    return;
}

function createCityButtonsStorage(city) {
    var column = document.createElement('div')
    column.classList.add('col-12')
    column.classList.add('button-group')

    var cityButton = document.createElement('button')
    cityButton.classList.add('btn')
    cityButton.classList.add("btn-secondary")
    cityButton.textContent = city
    column.appendChild(cityButton)
    localStorageItems.appendChild(column)
    var buttonPress = document.getElementsByClassName("btn-secondary");
    buttonPressed(buttonPress);


}

function buttonPressed(buttonPress) {
    for (let i = 0; i < buttonPress.length; i++) {
        buttonPress[i].addEventListener("click", function (event) {
            getAPI(event.target.textContent)
            fetchingCurrentLocation(event.target.textContent)
        })
    }

}