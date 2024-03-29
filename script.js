const apiKey = "481b87733a6cd06b36e49bbed10465a5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput"); // Changed the selector
const searchBtn = document.getElementById("searchButton"); // Changed the selector
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            updateWeatherUI(data);
        } else {
            console.error("Error retrieving weather data. Please try again.");
        }
    } catch (error) {
        console.error("An unexpected error occurred. Please try again later.");
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    setWeatherIcon(data.weather[0].main);
    document.querySelector(".weather").style.display = "block";
}

function setWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
        default:
            weatherIcon.src = "images/unknown.png"; // Add a default icon for unknown conditions
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
