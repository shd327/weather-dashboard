var input = "bridgewater"

function getAPI(input) {
    const myKey = "8d16f28b545852d623de7ad3baf04f51";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&cnt=5" + "&units=imperial" + "&appid=" + myKey)

        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
}
getAPI(input)