import { createPost } from "./js/app";
import { createTimer } from "./js/timer";
import Icon from "./assets/pixabay_logo.png";
import "./styles/normalize.scss";
import "./styles/style.scss";

window.onload = () => {
  document.querySelector("#default-image").style.display = "show";
};

// Adding an event listener to the generate button
document.querySelector('#submit').addEventListener('click', createPost);
document.querySelector('#submit').addEventListener('click', createTimer);

const myIcon = new Image();
myIcon.src = Icon;
const figC = document.querySelector("#pixabay");
const imgCode = `<p>Image courtesy of:</p> <a href="https://pixabay.com/"><img src="${Icon}" alt="Pixabay Logo"></a>`;
figC.innerHTML = imgCode;

export { createPost, createTimer, Icon };