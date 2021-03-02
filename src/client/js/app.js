//Callback function to create a post from Index.js
const createPost = async e => {
  e.preventDefault();
  const city = document.querySelector("#city").value;
  const encodedCity = encodeURIComponent(city);
  const baseUrl = `http://api.geonames.org/searchJSON?q=`;
  const options = `${encodedCity}&maxRows=1&username=joshuas1411`;
  const url = baseUrl + options;
  const geoData = await getData(url);
  const baseWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;
  const weatherOptions = `units=I&days=7&lat=${geoData.geonames[0].lat}&lon=${geoData.geonames[0].lng}&key=9bd6b8d321a64509ad2a9dbc04fbebfc`;
  const newUrl = baseWeatherUrl + weatherOptions;
  const weather = await getWeather(newUrl);
  const basePhotoUrl = `https://pixabay.com/api/?key=20255622-d1761b0f153bb43efa0b79842&`;
  const photoOptions = `q=${encodedCity}&image_type=photo&orientation=horizontal&category=travel`;
  const photoUrl = basePhotoUrl + photoOptions;
  const photo = await getPhotos(photoUrl).then(function (data) {
    //Calling funtion to POST data to server
    postData("http://localhost:3000/addData", {
      lat: geoData.geonames[0].lat,
      lng: geoData.geonames[0].lng,
      country: geoData.geonames[0].countryName,
      cityName: weather.city_name,
      high: weather.data[0].high_temp,
      low: weather.data[0].low_temp,
      weather: weather.data[0].weather.description,
      image: data.hits[0].largeImageURL
    }).then(function(){
    //Calling the Update UI function
      updateUi();
    });
  });
};

//Async fetch of geographic data
const getData = async url => {
  const res = await fetch(url); //Creating the API Key dynamically with user input
  const data = await res.json();
  console.log(data);
  return data;
};

//Async fetch of weather data
const getWeather = async newUrl => {
  const response = await fetch(newUrl); //Creating the API Key dynamically with user input
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};

//Async fecth of destination photo
const getPhotos = async photoUrl => {
  const photoRes = await fetch(photoUrl); //Creating the API Key dynamically with user input
  const photoData = await photoRes.json();
  console.log(photoData);
  return photoData;
};

// Async setting up POST
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
const updateUi = async () => {
  const response = await fetch('http://localhost:3000/all');
  const allData = await response.json();
  console.log(allData);
  const photoCode = `<img src="${allData.image}" alt="Photo of ${allData.cityName}">`;
  const photoDiv = document.querySelector("#destination-photo");
  photoDiv.insertAdjacentHTML("afterbegin", photoCode);
}

export { createPost };
