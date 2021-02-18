import { createPost } from "./js/app";
import "./styles/normalize.scss";
import "./styles/style.scss";

// Adding an event listener to the generate button
document.querySelector('#generate').addEventListener('click', createPost);

export { createPost };