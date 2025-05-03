let CityElement = document.querySelector("#city");
let SearchInput = document.querySelector("#search-form-input");

function refreshWeather(response) {
  console.log("API Response:", response.data); // Debugging log

  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.current.temp_c; // Current temperature in Celsius
  temperatureElement.innerHTML = `${temperature}°C`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.location.name; // City name from the API response

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.current.condition.text; // Weather description

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.current.humidity}%`; // Humidity percentage

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${response.data.current.wind_kph} km/h`; // Wind speed in km/h

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.location.localtime); // Local time from the API
  timeElement.innerHTML = formatDate(date);

  // Get coordinates for the forecast API call
  let lat = response.data.location.lat;
  let lon = response.data.location.lon;

  // Call getForecast with the coordinates
  getForecast(lat, lon);
}

function formatDate(date) {
  let dayIndex = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  CityElement.innerHTML = SearchInput.value;
  searchCity(SearchInput.value);
}

function searchCity(city) {
  let ApiKey = "be6404to0e1a8c3df9e20496bf57b54b";
  let ApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${ApiKey}&units=metric`;
  axios.get(ApiUrl).then(refreshWeather);
}

function displayForecast(forecastDays) {
  console.log("Forecast Data:", forecastDays); // Debugging log

  let forecastHtml = "";

  forecastDays.forEach(function (day) {
    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day.date}</div>
        <div class="weather-forecast-icon">
          <img
            src="${day.condition.icon}"
            alt="${day.condition.text}"
            class="weather-app-icon"
          />
        </div>
        <div class="weather-forecast-temperature">
          ${day.temperature.max}°C / ${day.temperature.min}°C
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(lat, lon) {
  let apiKey = "be6404to0e1a8c3df9e20496bf57b54b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      console.log("Forecast API Response:", response.data); // Debugging log
      displayForecast(response.data.daily); // Pass the daily forecast data
    })
    .catch(function (error) {
      console.error("Error fetching forecast data:", error);
    });
}

let SearchFormElement = document.querySelector("#search-form");
SearchFormElement.addEventListener("submit", handleSearchSubmit);
