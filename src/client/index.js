import { createPost } from "./js/app";
import { createTimer } from "./js/timer";
import Icon from "./assets/pixabay_logo.png";
import "./styles/normalize.scss";
import "./styles/style.scss";

// Setting elements to be visible on load or not
window.onload = () => {
  document.querySelector("#default-image").style.display = "show";
  document.querySelector("#user-data").style.display = "none";
  document.querySelector("#countdown-div").style.display = "none";
  document.querySelector("#weather-data").style.display = "none";
};

//Event listener for Add a Trip button
document.querySelector("#add-trip").addEventListener("click", () => {formUiUpdate()});

// Function to make the button invisible after clicking
function formUiUpdate() {
  document.querySelector("#add-trip").style.display = "none";
  document.querySelector("#user-data").style.display = "flex";
}

// Adding an event listener to the generate button
document.querySelector('#submit').addEventListener('click', createPost);
document.querySelector('#submit').addEventListener('click', createTimer);

const myIcon = new Image();
myIcon.src = Icon;
const figC = document.querySelector("#pixabay");
const imgCode = `<p>Images courtesy of:</p> <a href="https://pixabay.com/"><img src="${Icon}" alt="Pixabay Logo"></a>`;
figC.innerHTML = imgCode;

export { createPost, createTimer };