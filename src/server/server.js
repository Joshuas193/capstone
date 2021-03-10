// Setting an empty JS array to act as an endpoint for all routes
projectData = {};

//Require and configure dotenv to use environment variables for secret information
const dotenv = require("dotenv");
dotenv.config();

//Requiring node-fetch to make API calls from the server
const fetch = require("node-fetch");

//Require Express to run a local server
const express = require("express");
const app = express();
// Setting port number as a variable
const port = 3000;

//Requiring CORS for cross-origin
const cors = require("cors");
app.use(cors());

//Requiring body-parser
const bodyParser = require("body-parser");
//Body-parser for json
app.use(bodyParser.json());
//Body-parser for URL encoded values
app.use(bodyParser.urlencoded({ extended: true }));
//Using the generated Dist folder for the static folder
app.use(express.static("dist"));

//Designating the port for the production environment
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Setting up the GET request route
app.get("/all", (req, res) => {
  res.send(projectData);
});

//POST a journal entry
app.post("/addData", (req, res) => {
  let newData = req.body;
  let newEntry = {
    lat: newData.geoData.geonames[0].lat,
    lng: newData.geoData.geonames[0].lng,
    country: newData.geoData.geonames[0].countryName,
    cityName: newData.weather.city_name,
    high: newData.weather.data[0].high_temp,
    low: newData.weather.data[0].low_temp,
    weather: newData.weather.data[0].weather.description,
    image: newData.data.hits[0].largeImageURL,
  };
  console.log(newEntry);
  projectData = newEntry;
  res.send(projectData);
});
