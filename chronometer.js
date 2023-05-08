let appendMinutes = document.querySelector(".minutes");
let appendSeconds = document.querySelector(".seconds");
let appendTens = document.querySelector(".tens");
const startTime = document.querySelector(".start");
const stopTime = document.querySelector(".stop");
let minutes = 0;
let seconds = 0;
let tens = 0;
let interval;

function startTimer() {
  tens++;
  if (tens < 100) {
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    tens = 0;
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
  }
  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    seconds = 0;
    minutes++;
    appendMinutes.innerHTML = "0" + minutes;
  }
  if (minutes > 9) {
    appendMinutes.innerHTML = minutes;
  }
}

const onClickStart = () => {};
startTime.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});

stopTime.addEventListener("click", () => {
  clearInterval(interval);
});
