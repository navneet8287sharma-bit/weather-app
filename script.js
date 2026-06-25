const apiKey = "9de0871c90d2ad9ef2f37f9b7eb04445";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherDiv = document.getElementById("weather");

// Search when button is clicked
searchBtn.addEventListener("click", getWeather);

// Search when Enter key is pressed
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        weatherDiv.innerHTML = "<p>⏳ Loading...</p>";

        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            weatherDiv.innerHTML = `
                <h2>❌ City Not Found</h2>
                <p>Please check the spelling and try again.</p>
            `;
            return;
        }

        const icon = data.weather[0].icon;

        weatherDiv.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Icon">

            <h2>${data.name}, ${data.sys.country}</h2>

            <h3>${Math.round(data.main.temp)}°C</h3>

            <p>🌤 <strong>Weather:</strong> ${data.weather[0].main}</p>

            <p>🌡 <strong>Feels Like:</strong> ${Math.round(data.main.feels_like)}°C</p>

            <p>💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>

            <p>💨 <strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>

            <p>🔽 <strong>Pressure:</strong> ${data.main.pressure} hPa</p>

            <p>👀 <strong>Visibility:</strong> ${(data.visibility / 1000).toFixed(1)} km</p>
        `;

    } catch (error) {

        weatherDiv.innerHTML = `
            <h2>⚠️ Something went wrong!</h2>
            <p>Please check your internet connection and try again.</p>
        `;

        console.error(error);
    }
}
