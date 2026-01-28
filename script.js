const weatherElement = document.getElementById("weather");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const temp = document.getElementById("temp");

fetch("https://api.openweathermap.org/data/2.5/weather?id=524901&appid=2665d65d0763ec2a1c36cbf60a19e7fc")
    .then(response => response.json())
    .then(data => weatherElement.textContent = data.weather[0].main);

