// Global Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=c3674100cc3382bf47fccf8637a3e903';
const dateNow = new Date().toLocaleDateString();

// Adding an event listener to the generate button
document.querySelector('#generate').addEventListener('click', createPost);

// Callback function to create a post
function createPost() {
  // Local variables
  const zip = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  // Calling function to retrieve weather data
  getWeather(baseUrl, zip, apiKey)
  // Chaining promises
  .then(function(data) {
    // calling funtion to POST data to server
    postData('/addWeather', {date: dateNow, weather: data.main.temp, content: feelings});
    // Calling the Update UI function
    updateUi();
  })
}

// Async fetch of weather data
const getWeather = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl+zip+apiKey) //creating the API Key dynamically with user input
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

// Async setting up POST
const postData = async ( url = '', data = {}) => {
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
    return newData;
  } catch(error) {
    console.log('error', error);
  }
}

// Async function to update the UI with the information from the user and from the API
const updateUi = async () => {
  const response = await fetch('/all');
  try {
    const allData = await response.json();
    console.log(allData)
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.weather;
    document.getElementById('content').innerHTML = allData.content;
  } catch(error) {
    console.log('error', error);
  }
}