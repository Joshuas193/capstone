// Function to create a countdown timer.
//Inspiration for this function from https://www.w3schools.com/howto/howto_js_countdown.asp
const createTimer = async () => {
  const departure = document.querySelector("#departure").value;
  console.log(departure);
  const countDownDate = new Date(`${departure}`).getTime();
  console.log(countDownDate);
  // setting the countdown interval
  const i = setInterval(function () {
    // getting current date and time
    let now = new Date().getTime();
    // finding the amount of time left
    let remainder = countDownDate - now;
    // Time calculations for hours, days, minutes, seconds
    let days = Math.floor(remainder / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainder % (1000 * 60)) / 1000);
    // Inserting the countdown timer into the HTML document
    document.querySelector(
      "#countdown-timer"
    ).innerHTML = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    //if the countdown is finished, write some text
    if (remainder < 0) {
      clearInterval(i);
      document.querySelector("#countdown-timer").innerHTML =
        "Time for Vacation!!";
    }
  }, 1000);
};

export { createTimer };
