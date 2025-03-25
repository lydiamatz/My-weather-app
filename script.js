let CityElement = document.querySelector("#city");
let SearchInput = document.querySelector("#search-form-input");

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  CityElement.innerHTML = SearchInput.value;
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

let SearchFormElement = document.querySelector("#search-form");
SearchFormElement.addEventListener("submit", handleSearchSubmit);
