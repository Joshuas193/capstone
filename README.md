# Capstone Project
This is the final project for my Fron-End Nano-Degree. In this project I will use multiple API's to create a travel app.
This will gather weather for the time the trip is planned and for the destination the user wishes to go to.

### Pixabay License
The photos used in this project are form Pixabay. [Link](https://pixabay.com/service/license/) to see their License.

### Dependency List
Dependancies are located in the package.json file as well. The list is as follows.

#### Dependancies
* body-parser v1.19.0
* cors v2.8.5
* express v4.17.1

#### Development Dependencies
* @babel/core v7.12.13
* @babel/preset-env v7.12.13
* babel-loader v8.2.2
* clean-webpack-plugin v3.0.0
* css-loader v5.0.2
* html-webpack-plugin v5.0.0
* jest v26.6.3
* mini-css-extract-plugin v1.3.6
* node-sass v5.0.0
* optimize-css-assets-webpack-plugin v5.0.4
* sass-loader v11.0.1
* style-loader v2.0.0
* terser-webpack-plugin v5.1.1
* webpack v5.21.2
* webpack-cli v4.5.0
* webpack-dev-server v3.11.2

### Installation Instructions
* First you will need to install the application. Open your terminal and navigate into the directory you wish to install the application and type `npm install`
* Next you will need to build the program by typing `npm run build`
* After you have built the program you wil need to start the local server with `npm start`
* (Option) At this point if you wish to run a development server you can open a second terminal and enter the command `npm build dev` which will automatically open a browser window running the application.

### Use Instructions
The app is quite simple. All that is required is to enter the name of a city in the proper field, then enter a departure time and date as well as a return time and date. You can use the calendar icon in the entry fields to quickly enter the ddates quickly. Then just press the submit button and the application will pull all the neccesary data from the APIs and return your information and a photo of the placve you wish to visit.