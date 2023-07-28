
var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = '5a1ecf61ee1bbe450ff798f579f1988c';

var searchForm = document.querySelector('.search')
var searchInput = document.querySelector('.city')
var currentlyDayContainer = document.querySelector('#currentlyDay');
var followUpDaysContainer = document.querySelector('#followUpDays');
var searchHistoryContainer = document.querySelector('#historyContainer');
var city = ""
var cities = []


function searchCity(event) {
    event.preventDefault()
    var btn = document.createElement('button')
    btn.id = 'history'
    btn.textContent = searchInput.value
    city = searchInput.value
    cities.push(city)
    localStorage.setItem('cities', JSON.stringify(cities))
    searchHistoryContainer.appendChild(btn)
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchInput.value + '&appid=5a1ecf61ee1bbe450ff798f579f1988c')
        .then(res => res.json())
        .then(data => {
            console.log(data)

            document.querySelector('#temp').textContent = 'temp: ' + data.main.temp
            document.querySelector('#wind').textContent = 'wind: ' + data.wind.speed
            document.querySelector('#humidity').textContent = 'humidity: ' + data.main.humidity




            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=5a1ecf61ee1bbe450ff798f579f1988c')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    document.querySelector('#cityName').textContent = city + ": " + data.list[0].dt_txt.substring(0, 10)
                    document.querySelector('#date1').textContent = 'date: ' + data.list[0].dt_txt.substring(10, 0)
                    document.querySelector('#temp1').textContent = 'temp: ' + data.list[0].main.temp
                    document.querySelector('#wind1').textContent = 'wind: ' + data.list[0].wind.speed
                    document.querySelector('#humidity1').textContent = 'humidity: ' + data.list[0].main.humidity

                    document.querySelector('#date2').textContent = 'date: ' + data.list[8].dt_txt.substring(0, 10)
                    document.querySelector('#temp2').textContent = 'temp: ' + data.list[8].main.temp
                    document.querySelector('#wind2').textContent = 'wind: ' + data.list[8].wind.speed
                    document.querySelector('#humidity2').textContent = 'humidity: ' + data.list[8].main.humidity

                    document.querySelector('#date3').textContent = 'date: ' + data.list[16].dt_txt.substring(0, 10)
                    document.querySelector('#temp3').textContent = 'temp: ' + data.list[16].main.temp
                    document.querySelector('#wind3').textContent = 'wind: ' + data.list[16].wind.speed
                    document.querySelector('#humidity3').textContent = 'humidity: ' + data.list[16].main.humidity

                    document.querySelector('#date4').textContent = 'date: ' + data.list[24].dt_txt.substring(0, 10)
                    document.querySelector('#temp4').textContent = 'temp: ' + data.list[24].main.temp
                    document.querySelector('#wind4').textContent = 'wind: ' + data.list[24].wind.speed
                    document.querySelector('#humidity4').textContent = 'humidity: ' + data.list[24].main.humidity

                    document.querySelector('#date5').textContent = 'date: ' + data.list[32].dt_txt.substring(0, 10)
                    document.querySelector('#temp5').textContent = 'temp: ' + data.list[32].main.temp
                    document.querySelector('#wind5').textContent = 'wind: ' + data.list[32].wind.speed
                    document.querySelector('#humidity5').textContent = 'humidity: ' + data.list[32].main.humidity
                })
        })
}

searchForm.addEventListener('submit', searchCity)

