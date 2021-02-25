import { createPost } from "./js/app";
import { createTimer } from "./js/timer";
import "./styles/normalize.scss";
import "./styles/style.scss";

// Adding an event listener to the generate button
document.querySelector('#submit').addEventListener('click', createPost);
document.querySelector('#submit').addEventListener('click', createTimer);

export { createPost, createTimer };