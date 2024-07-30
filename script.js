let city = document.querySelector(".city-name");
let temperature = document.querySelector(".temperature");
let windSpeed = document.querySelector(".wind-speed");
let humidity = document.querySelector(".humidity-level");
let visibility = document.querySelector(".Visibillity-distance");
let weatherDescription = document.querySelector(".weatherDescription");
let date = document.querySelector(".date");
let searchForm = document.querySelector(".search-form");
let cityInput = document.querySelector("#city-input");
let img = document.getElementsByTagName("img");

let apiKey = `cff19b0493d51fd2ae4f8cfd1d1e5468`;


let currDate = new Date();
date.innerHTML = currDate.toDateString();

async function fetchWeatherData(cityName) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
  );
  let data = await response.json();
  console.log(data);
  updateWeather(data);
}

const updateWeather = (data) => {
  city.innerHTML = data.name;
  temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
  windSpeed.innerHTML = `${data.wind.speed} km/h`;
  humidity.innerHTML = `${data.main.humidity}%`;
  visibility.innerHTML = `${data.visibility / 1000} km`;
  weatherDescription.innerHTML = data.weather[0].description;

  let weatherName = getWeatherImage(data.weather[0].main);
  img[0].src = weatherName;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = cityInput.value;
  if (cityName !== "") {
    fetchWeatherData(cityName);
    cityInput.value = "";
  }
});

const getWeatherImage = (weatherCondition) => {
  const imageMap = {
    Clear: "animated/day.svg",
    Clouds: "animated/cloudy.svg",
    Rain: "animated/rainy.svg",
    Thunderstorm: "animated/thunder.svg",
    Drizzle: "animated/drizzle.svg",
    Snow: "animated/snow.svg",
    Mist: "animated/mist.svg",
    Smoke: "animated/cloudy.svg",
    Haze: "animated/cloudy.svg",
    Fog: "animated/cloudy.svg",
  };
  return imageMap[weatherCondition];
};
