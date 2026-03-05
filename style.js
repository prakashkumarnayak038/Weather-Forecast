const apiKey = "dfce04943ffc7494ebc9feee6e5f2339";

function getWeather() {

    const city = document.getElementById("cityInput").value;

  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        document.getElementById("temperature").innerText = data.main.temp + "°C";
        document.getElementById("condition").innerText = data.weather[0].main;
        document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind").innerText = "Wind Speed: " + data.wind.speed + " km/h";

        const condition = data.weather[0].main.toLowerCase();
        const icon = document.getElementById("weatherIcon");

        if (condition.includes("cloud")) icon.innerText = "☁️";
        else if (condition.includes("rain")) icon.innerText = "🌧";
        else if (condition.includes("clear")) icon.innerText = "☀️";
        else if (condition.includes("storm")) icon.innerText = "⛈";
        else icon.innerText = "🌍";

            const temp = data.main.temp;
                const body = document.body;

                body.classList.remove("cold-bg","mild-bg","hot-bg");

                if (temp < 10) {
                    body.classList.add("cold-bg");
                }
                else if (temp >= 10 && temp < 25) {
                    body.classList.add("mild-bg");
                }
                else {
                    body.classList.add("hot-bg");
                }

    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {

        const forecastContainer = document.getElementById("forecastContainer");
        forecastContainer.innerHTML = "";

        for (let i = 0; i < 24; i += 8) {

            const dayData = data.list[i];

            const date = new Date(dayData.dt_txt).toLocaleDateString();
            const temp = dayData.main.temp;
            const condition = dayData.weather[0].main;

            let icon = "🌍";
            if (condition.toLowerCase().includes("cloud")) icon = "☁️";
            else if (condition.toLowerCase().includes("rain")) icon = "🌧";
            else if (condition.toLowerCase().includes("clear")) icon = "☀️";

            forecastContainer.innerHTML += `
                <div class="forecast-card">
                    <div class="forecast-icon">${icon}</div>
                    <p>${date}</p>
                    <p>${temp}°C</p>
                    <p>${condition}</p>
                </div>
            `;
        }

    });

}



document.getElementById("cityInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});

function getLocationWeather() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {

                document.getElementById("temperature").innerText = data.main.temp + "°C";
                document.getElementById("condition").innerText = data.weather[0].main;
                document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
                document.getElementById("wind").innerText = "Wind Speed: " + data.wind.speed + " km/h";

            });

        });

    } else {

        alert("Geolocation not supported");

    }

}