// Global Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=c3674100cc3382bf47fccf8637a3e903';

//Adding an event listener to the generate button
document.querySelector('#generate').addEventListener('click', createPost);

//Callback function to create a post
function createPost() {
  const feelings = document.querySelector('#feelings').value;
  const zip = document.querySelector('#zip').value;
  getWeather(baseUrl, zip, apiKey)
  // Chaining promises
  .then(function(data) {
    console.log(data);
    postData('/journal', {date: data.main[0], weather: data.main[4], content: feelings})
    updateUi();
  })
}

//async fetch of weather data
const getWeather = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl+zip+apiKey)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

//Setting up POST route
const postData = async ( url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  } catch(error) {
    console.log('error', error)
  }
}

postData('/journal', {weather: data.weather, feeling: feelings});