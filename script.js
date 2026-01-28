const city = document.getElementById("city");
const weatherElement = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const temp = document.getElementById("temp");

//Hämtar väder i Kungsbacka i metrics
fetch("https://api.openweathermap.org/data/2.5/weather?q=Kungsbacka,SE&appid=2665d65d0763ec2a1c36cbf60a19e7fc&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        city.textContent = (data.name);
        weatherElement.textContent = (data.weather[0].main);

        //sunrise och sunset behöver konverteras till tid enligt api
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        //slice klipper ut positionen som innehåller tiden jag är ute efter
        sunrise.textContent = sunriseTime.toUTCString().slice(17, 22);
        sunset.textContent = sunsetTime.toUTCString().slice(17, 22);

        //rundar av temperaturen och lägger till gradtecken
        temp.textContent = Math.round(data.main.temp) + "°C";
    });
