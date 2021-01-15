// Global Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=c3674100cc3382bf47fccf8637a3e903';

//Adding an event listener to the generate button
document.querySelector('#generate').addEventListener('click', createPost);

//Callback function to create a post
function createPost() {
  const feelings = document.querySelector('#feelings').value;
  const zip = document.querySelector('#zip').value;
  const dateNow = new Date().toLocaleDateString();
  getWeather(baseUrl, zip, apiKey)
  // Chaining promises
  .then(function(data) {
    console.log(data);
    postData('/journal', {date: dateNow, weather: data.main.temp, content: feelings})
  })
  .then(
    updateUi()
  )
}

//async fetch of weather data
const getWeather = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl+zip+apiKey)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

//Setting up POST route
const postData = async ( url = '', data = {}) => {
  console.log(data);
  const response = await fetch('/journal', {
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

const updateUi = async () => {
  const request = await fetch('/journal');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].weather;
    document.getElementById('content').innerHTML = allData[0].feelings;
  } catch(error) {
    console.log('error', error);
  }
}