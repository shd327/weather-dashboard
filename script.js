var input = "bridgewater"
var fiveDay = document.getElementById("five_day")

var citySearch = document.getElementById("citySearch")

var searchBtn = document.getElementById("searchBtn")


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
            fiveDay.textContent = "";
            for (let i = 0; i < data.list.length; i++) {
                var date = data.list[i].dt_txt
                var humidity = data.list[i].main.humidity
                var windSpeed = data.list[i].wind.speed
                console.log(date + " " + humidity + " " + windSpeed)
            }
        })
}
getAPI(input)

searchBtn.addEventListener("click", function () {
    console.log(citySearch.value)
})

// temp wind humidity