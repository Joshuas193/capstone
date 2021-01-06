// Setting an empty JS object to act as an endpoint for all routes
projectData = {};

// Requiring express
const express = require('express');

// Starting an instance of the app using express
const app = express();

/* Middleware */
// setting up body-parser as the middleware for express
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main proect folder
app.use(express.static('website'));

/* Server */
// Setting the local server port
const port = 8000;

// Setting the server listen on the specified port and use the callback function
const server = app.listen(port, () => {console.log(`Running on Localhost: ${port}`)});