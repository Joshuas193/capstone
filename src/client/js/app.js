// Callback function to create a post from Index.js
const createPost = async () => {
  const geoData = await getData();
    console.log(geoData);
    const baseWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;
    const weatherOptions = `units=I&days=7&lat=${geoData.geonames[0].lat}&lon=${geoData.geonames[0].lng}&key=9bd6b8d321a64509ad2a9dbc04fbebfc`;
    const newUrl = baseWeatherUrl+weatherOptions
    console.log(newUrl);
      const weather = await getWeather(newUrl);
        console.log(weather);
  // Calling function to retrieve geo data
    //.then(function(data) {
    // calling funtion to POST data to server
    //postData('http://localhost:3000/addData', { lat: data.geonames[0].lat, lng: data.geonames[0].lng, country: data.geonames[0].countryName });
    // Calling the Update UI function
    //updateUi();
    //}
};

// Async fetch of geographic data
const getData = async () => {
  const city = document.querySelector('#city').value;
  const encodedCity = encodeURIComponent(city);
  console.log(encodedCity);
  const baseUrl = `http://api.geonames.org/searchJSON?q=`;
  const options = `${encodedCity}&maxRows=1&username=joshuas1411`;
  const res = await fetch(baseUrl+options); //creating the API Key dynamically with user input
  const data = await res.json();
  console.log(data)
  return data;
}

//Async fetch of weather data
const getWeather = async newUrl => {
  const response = await fetch(newUrl);
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

// Async setting up POST
const postData = async ( url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log('error', error);
  }
}

// Async function to update the UI with the information from the user and from the API
const updateUi = async () => {
  const response = await fetch('http://localhost:3000/all');
  try {
    const allData = await response.json();
    console.log(allData)
  } catch(error) {
    console.log('error', error);
  }
}

export { createPost };