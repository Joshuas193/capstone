// Requiring express
const express = require('express');

// Starting an instance of the app using express
const app = express();

// Setting an empty JS array to act as an endpoint for all routes
projectData = [];

/* Middleware */
// setting up body-parser as the middleware for express
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder
app.use(express.static('website'));

/* Server */
// Setting the local server port
const port = 8000;

// Setting the server listen on the specified port and use the callback function
const server = app.listen(port, () => console.log(`Running on Localhost: ${port}`));

//Setting up the POST request route
app.post('/journal', addPost);

function addPost (req, res) {
  //creating an object from the req info
  newEntry = {
    date: req.body.date,
    weather: req.body.weather,
    feelings: req.body.content
  }

  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData);
}

//Setting up the GET request route
app.get('/journal', (req, res) => {
  res.send(projectData);
  console.log(projectData);
});