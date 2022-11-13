// selector elements and global variables
var fiveDay = document.getElementById("five_day")
var citySearch = document.getElementById("citySearch")
var currentName = ""
var searchBtn = document.getElementById("searchBtn")
var displayArea = document.getElementById("displayArea")
let localStorageItems = document.getElementById('localStorageItems')
// Gets local storage items if there is not any create an empty array
let savedCities = localStorage.getItem('savedCities') ? JSON.parse(localStorage.getItem('savedCities')) : []
// loops through local storage array and sends to function createCityButtonsStorage()
for (let i = 0; i < savedCities.length; i++) {
    createCityButtonsStorage(savedCities[i])

}

// This function handles the five day forcast using params &cnt=5, &units=imperial and &appid=myKey
// 
function getAPI(input) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&cnt=5" + "&units=imperial" + "&appid=" + myKey)
        // formats returns data from API to JSON format
        .then(function (response) {
            return response.json()
        })
        // If input city returns a 404 it calls the  NotACity() function
        .then(function (data) {
            if (data.cod === "404") {
                NotACity()

            }
            else {
                // If input city doesnt return a 404 it calls the  validateCity() function
                validateCity(data.name)
            }
            return data
        })
        // Here is where we loop through the json formatted data and generate the card elements for the HTML
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
                // Now the data is appended to the HTML five_day ID
                fiveDay.append(div);
            }
        })
}
// event listener on the search button click event that validates if the city is a real city
// Also sends the city name to both getAPI() and fetchingCurrentLocation() functions to fetch data
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

// This function first fetches the city name using openWeathMap API
function fetchingCurrentLocation(citySearch) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myKey + "&units=imperial")
        // formats the data to JSON

        .then(function (response) {
            return response.json();
        })
        // If input city doesnt return a 404 it calls the  validateCity() function
        .then(function (data) {

            if (data.cod === "404") {
                NotACity()

            }
            else {
                validateCity(data.name)
            }
            return data;
            // We now grab the lat and lon and use them as params for the fetch 
        }).then(function (data) {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            currentName = data.name
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + myKey + "&units=imperial")
                // fromats the return data to JSON
                .then(function (response) {
                    return response.json();
                })
                // Here is where we generate the html elements for the return data
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
                    uvData.style.width = "6%"
                    var icon = data.current.weather[0].icon

                    let displayIcon = `http://openweathermap.org/img/wn/${icon}.png`
                    img.src = displayIcon;
                    // We check the UV data and add style depending on UV levels
                    if (data.current.uvi < 2) {
                        uvData.classList.add("green")
                    }
                    else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                        uvData.classList.add("yellow")
                    }
                    else if (data.current.uvi > 5 && data.current.uvi <= 7)
                        uvData.classList.add("orange")
                    else if (data.current.uvi > 7 && data.current.uvi <= 10) {
                        uvData.classList.add("red")

                    }
                    else {
                        uvData.classList.add("purple")
                    }


                    // We now append the data to the HTML
                    displayArea.appendChild(cityName)
                    displayArea.appendChild(img)
                    displayArea.appendChild(temperature)
                    displayArea.appendChild(wind)
                    displayArea.appendChild(humidity)
                    displayArea.appendChild(uvData)
                })
        })
}




// This function takes the city name from the input element
// We save the current local storage array to saveCities array
// checks if the current local storage already contains this city
// if the city already exist in the local storage array it sets the flag as true
// else it sets the flag it pushes the the new city to saveCities array and overwrites the current local storage array
// We then call the createCityButtonsStorage function and pass in the city name
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
    }

    // return data;

}

// Alerts user city is not a valid city
function NotACity() {
    alert("This City doesn't exist")

    return;
}

// This function takes in a city name and generate the html buttons per city
// This function than calls buttonPressed function 
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
// This function adds a click event listener to each button
// When a button is pressed it calls both getAPI() and fetchingCurrentLocation() functions to perform the fetch
function buttonPressed(buttonPress) {
    for (let i = 0; i < buttonPress.length; i++) {
        buttonPress[i].addEventListener("click", function (event) {
            getAPI(event.target.textContent)
            fetchingCurrentLocation(event.target.textContent)
        })
    }

}