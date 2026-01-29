const city = document.getElementById("city");
const weatherElement = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const temp = document.getElementById("temp");
const forecast = document.getElementById("forecast");

Promise.all([
    //Hämtar väder i Kungsbacka i metrics
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Kungsbacka,SE&appid=2665d65d0763ec2a1c36cbf60a19e7fc&units=metric").then(response => response.json()),
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Kungsbacka,SE&appid=2665d65d0763ec2a1c36cbf60a19e7fc&units=metric").then(response => response.json())
])

    .then(([currentData, forecastData]) => {
        console.log(currentData);
        console.log(forecastData);
        city.textContent = (currentData.name);
        weatherElement.textContent = (currentData.weather[0].description);

        //sunrise och sunset behöver konverteras till tid enligt api
        const sunriseTime = new Date(currentData.sys.sunrise * 1000);
        const sunsetTime = new Date(currentData.sys.sunset * 1000);
        //slice klipper ut positionen som innehåller tiden jag är ute efter
        sunrise.textContent = sunriseTime.toUTCString().slice(17, 22);
        sunset.textContent = sunsetTime.toUTCString().slice(17, 22);

        //rundar av temperaturen till en decimal och lägger till gradtecken
        temp.textContent = Math.round(currentData.main.temp * 10) / 10 + "°C";

        //Forecast för 5 dagar som laddas kl 12 varje dag
        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

        const forecastHTML = dailyForecasts.map(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('sv-SE', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            return `<div>${dayName}: ${temp}° </div > `;
        }).join('');
        forecast.innerHTML = forecastHTML;

    });
