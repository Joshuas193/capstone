// Callback function to create a post from Index.js
async function createPost(e) {
  e.preventDefault();
  document.querySelector("#user-data").style.display = "none";
  const url = await urlBuilder();
  const geoData = await getData(url.url);
  const dateFormat = await departureDate();
  const endDateFormat = await returnDate(dateFormat.departure);
  const newUrl = await weatherApiBuilder(
    geoData.geonames[0].lat,
    geoData.geonames[0].lng,
    dateFormat.dateFormat,
    dateFormat.days,
    endDateFormat.endDateFormat,
    endDateFormat.tripDays
  );
  console.log(newUrl)
  const weather = await getWeather(newUrl);
  const photoUrl = await photoUrlBuilder(url.encodedCity);
  const photo = await getPhotos(photoUrl).then(function (data) {
    // Calling funtion to POST data to server
    postData("http://localhost:3000/addData", { geoData, weather, data }).then(function () {
      // Calling the functions to dynamically update content
      updateUiPhoto(endDateFormat.tripDays);
      updateWeatherUi(dateFormat.days);
    });
  });
}

// Async function to create geonames URL
const urlBuilder = async () => {
  const city = document.querySelector("#city").value;
  const encodedCity = encodeURIComponent(city);
  const baseUrl = `http://api.geonames.org/searchJSON?q=`;
  const options = `${encodedCity}&maxRows=10&username=joshuas1411`;
  const url = baseUrl + options;
  return { encodedCity, url };
};

// Async fetch of geographic data
const getData = async (url) => {
  const res = await fetch(url); // Creating the API Key dynamically with user input
  const data = await res.json();
  console.log(data);
  return data;
};

// Async function to create a date format for historic weather data
const departureDate = async () => {
  const departure = document.querySelector("#departure").value;
  let yyyy = new Date(`${departure}`).getFullYear() - 1;
  let mm = new Date(`${departure}`).getMonth() + 1;
  let dd = new Date(`${departure}`).getDate();
  const dateFormat = `${yyyy}-${mm}-${dd}`;
  console.log(dateFormat);
  let now = new Date().getTime();
  let countDownDate = new Date(`${departure}`).getTime();
  let remainder = countDownDate - now;
  let days = Math.floor(remainder / (1000 * 60 * 60 * 24));
  console.log(days);
  return { dateFormat, departure, days };
};

// Async function to create a return date format for historic weather data
// Had to modify because the API only lets me pull one day of data at a time
const returnDate = async departure => {
  const returnDate = document.querySelector("#return-date").value;
  let yyyy = new Date(`${returnDate}`).getFullYear() - 1;
  let mm = new Date(`${returnDate}`).getMonth() + 1;
  let dd = new Date(`${returnDate}`).getDate();
  let dd2 = new Date(`${departure}`).getDate();
  let dd3 = new Date(`${departure}`).getDate() + 1;
  console.log(dd3);
  const endDateFormat = `${yyyy}-${mm}-${dd3}`;
  console.log(endDateFormat);
  let tripDays = dd - dd2;
  console.log(tripDays);
  return { endDateFormat, tripDays };
};

// Function that determines if a trip is in more than 7 days inthe future,
// and creates an API based on either current or historical data
const weatherApiBuilder = async (lat, lng, dateFormat, days, endDateFormat, tripDays) => {
  const baseWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;
  const weatherOptions = `units=I&days=${tripDays}&lat=${lat}&lon=${lng}&key=9bd6b8d321a64509ad2a9dbc04fbebfc`;
  const historicalWeatherUrl = `https://api.weatherbit.io/v2.0/history/daily?`;
  const historicalWeatherOptions = `units=I&start_date=${dateFormat}&end_date=${endDateFormat}&lat=${lat}&lon=${lng}&key=9bd6b8d321a64509ad2a9dbc04fbebfc`;
  const newUrl =
    days <= 7
      ? baseWeatherUrl + weatherOptions
      : historicalWeatherUrl + historicalWeatherOptions;
  return newUrl;
};

// Async fetch of weather data
const getWeather = async newUrl => {
  const response = await fetch(newUrl); // Creating the API Key dynamically with user input
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};

// Async API call using data from geodata function for user input
const photoUrlBuilder = async encodedCity => {
  const basePhotoUrl = `https://pixabay.com/api/?key=20255622-d1761b0f153bb43efa0b79842&`;
  const photoOptions = `q=${encodedCity}&image_type=photo&orientation=horizontal&category=travel`;
  const photoUrl = basePhotoUrl + photoOptions;
  return photoUrl;
};

// Async fecth of destination photo
const getPhotos = async photoUrl => {
  const photoRes = await fetch(photoUrl); // Creating the API Key dynamically with user input
  const photoData = await photoRes.json();
  console.log(photoData);
  return photoData;
};

// Async setting up POST to server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Async function to update the UI with the information from the user and from the API
const updateUiPhoto = async tripDays => {
  const response = await fetch("http://localhost:3000/all");
  const allData = await response.json();
  console.log(allData);
  document.querySelector("#default-image").style.display = "none";
  const photoMessage = document.querySelector("#countdown-message");
  photoMessage.innerHTML = `<p>Your ${tripDays} day trip to ${allData.cityName} starts in:</p>`;
  const photoCode = `<img src="${allData.image}" alt="Photo of ${allData.cityName}">`;
  const photoDiv = document.querySelector("#images");
  photoDiv.insertAdjacentHTML("afterbegin", photoCode);
};

// Async function to update the weather div with information
const updateWeatherUi = async days => {
  const response = await fetch("http://localhost:3000/all");
  const allData = await response.json();
  console.log(allData);
  document.querySelector("#output").style.display = "block";
  const weatherDiv = document.querySelector("#weather-data");
  const message =
  days <= 7 ? `<p>The current weather forecast for your trip is:</p>
               <p>High: ${allData.high}&deg;F Low: ${allData.low}&deg;F</p>
               <p>${allData.clouds}% cloud cover and an average of</p>
               <p>${allData.precip} inches of precipitataion.</p>`:
              `<p>Typical weather for the date of your trip is:</p>
               <p>High: ${allData.max}&deg;F  Low: ${allData.min}&deg;F</p>
               <p>${allData.clouds}% cloud cover and an average of</p>
               <p>${allData.precip} inches of precipitataion.</p>`;
  console.log(days);
  weatherDiv.insertAdjacentHTML("afterbegin", message);
};

export { createPost };
