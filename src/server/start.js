const app = require('./server.js')

// Setting port number as a variable
const port = 3000;
//Designating the port for the production environment
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});