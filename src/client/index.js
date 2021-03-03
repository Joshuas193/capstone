import { createPost } from "./js/app";
import { createTimer } from "./js/timer";
import "./styles/normalize.scss";
import "./styles/style.scss";

window.onload = () => {
  const defaultPhoto = `<img src="" alt="Beach Photo">`;
  const defaultDiv = document.querySelector("#default-image");
  defaultDiv.insertAdjacentHTML("afterbegin", defaultPhoto);
  document.querySelector("#default-image").style.display = "show";
  document.querySelector("#destination-photo").style.display = "none";
};

// Adding an event listener to the generate button
document.querySelector('#submit').addEventListener('click', createPost);
document.querySelector('#submit').addEventListener('click', createTimer);

export { createPost, createTimer };