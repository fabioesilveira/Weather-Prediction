var searchHistory = [];
var weatherApiKey = '5a1ecf61ee1bbe450ff798f579f1988c';

var searchForm = document.querySelector('.search');
var searchInput = document.querySelector('.city');
var searchHistoryContainer = document.querySelector('#historyContainer');

var city = "";
var defaultCities = [
    "San Francisco",
    "Los Angeles",
    "San Jose",
    "San Diego",
    "Sacramento",
    "Oakland",
    "Berkeley",
    "Palm Springs"
];

var cities = JSON.parse(localStorage.getItem("cities")) || defaultCities;

if (!localStorage.getItem("cities")) {
    localStorage.setItem("cities", JSON.stringify(defaultCities));
}

// ---------------- Emoji helper ----------------
function getWeatherEmoji(id) {
    if (id >= 200 && id < 300) return "⛈️";
    if (id >= 300 && id < 400) return "🌦️";
    if (id >= 500 && id < 600) return "🌧️";
    if (id >= 600 && id < 700) return "❄️";
    if (id >= 700 && id < 800) return "🌫️";
    if (id === 800) return "☀️";
    if (id > 800 && id < 900) return "☁️";
    return "🌡️";
}

function formatCityName(cityName) {
    return cityName
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// ---------------- RENDER HISTORY ON PAGE LOAD ----------------
function renderHistory() {
    searchHistoryContainer.innerHTML = "";

    cities.forEach((cityName) => {
        var btn = document.createElement("button");
        btn.classList.add("history-btn");
        btn.textContent = cityName;

        // Click event for each history button
        btn.addEventListener("click", function () {
            searchWeather(cityName);
        });

        searchHistoryContainer.appendChild(btn);
    });
}

// ---------------- SAVE NEW CITY TO HISTORY ----------------
function saveToHistory(cityName) {
    var formattedCityName = formatCityName(cityName);

    cities = cities.filter(city => city !== formattedCityName);

    cities.unshift(formattedCityName);

    if (cities.length > 8) {
        cities.pop();
    }

    localStorage.setItem("cities", JSON.stringify(cities));
    renderHistory();
}

// ---------------- FETCH + DISPLAY WEATHER ----------------
function searchWeather(cityName) {
    // CURRENT WEATHER
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log("CURRENT WEATHER:", data);

            var emoji = getWeatherEmoji(data.weather[0].id);

            document.querySelector('#temp').textContent = emoji + ' temp: ' + data.main.temp;
            document.querySelector('#wind').textContent = 'wind: ' + data.wind.speed;
            document.querySelector('#humidity').textContent = 'humidity: ' + data.main.humidity;

            // FORECAST
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${weatherApiKey}`)
                .then(res => res.json())
                .then(data => {
                    console.log("FORECAST:", data);

                    document.querySelector('#cityName').textContent =
                        cityName + ": " + data.list[0].dt_txt.substring(0, 10);

                    // 5-day blocks
                    const indexes = [0, 8, 16, 24, 32];

                    indexes.forEach((idx, i) => {
                        let emoji = getWeatherEmoji(data.list[idx].weather[0].id);

                        document.querySelector(`#date${i + 1}`).innerHTML =
                            emoji + " " + new Date(data.list[idx].dt_txt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short"
                            }) + "<br>";

                        document.querySelector(`#temp${i + 1}`).textContent =
                            "temp: " + data.list[idx].main.temp;

                        document.querySelector(`#wind${i + 1}`).textContent =
                            "wind: " + data.list[idx].wind.speed;

                        document.querySelector(`#humidity${i + 1}`).textContent =
                            "humidity: " + data.list[idx].main.humidity;
                    });
                });
        });
}

// ---------------- FORM SUBMIT ----------------
function searchCity(event) {
    event.preventDefault();

    var cityName = searchInput.value.trim();
    if (!cityName) return;

    var formattedCityName = formatCityName(cityName);

    searchInput.value = formattedCityName;
    saveToHistory(formattedCityName);
    searchWeather(formattedCityName);
}

searchForm.addEventListener('submit', searchCity);

// Initial render
renderHistory();
