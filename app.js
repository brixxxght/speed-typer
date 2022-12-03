import phrase from "./phrase.js";

// => DOM 🔎
const startGameButton = document.getElementById("button");
const statsContent = document.getElementById("stats");
const input = document.getElementById("input");
const textDisplay = document.getElementById("text-display");
const form = document.getElementById("form");
const mainContent = document.getElementById("main-content");
const timeDisplay = document.getElementById("time-display");
const wpmDisplay = document.getElementById("wpm-display");
const scoreDisplay = document.getElementById("score-display");
// => Helpers 🤲

// split the phrase to an array
const splitPhrase = phrase.split(" ");

// => Functions 🤖
function getRandomWord() {
  return splitPhrase[Math.floor(Math.random() * splitPhrase.length)];
}

function nextWord() {
  const word = getRandomWord();
  textDisplay.textContent = word;
  state.currentWord = word;
}

function createWordSpan(color, content) {
  const span = document.createElement("span");
  const style = "background-color: " + color;
  span.setAttribute("style", style);
  span.setAttribute("class", "text-padding");

  span.textContent = content;
  return span;
}

function startClock() {
  setInterval(function () {
    // every 1 second
    state.elaspsedTime += 1;

    // clac and display stats
    renderStats();
    if (state.elaspsedTime === state.gameLenght) {
      alert("Game Over Comrade 🤪,Your WPM is: " + wpmDisplay.textContent);

      // reload the page
      window.location.reload();
    }
  }, 1000);
}

function renderStats() {
  // time remaining
  timeDisplay.textContent = state.gameLenght - state.elaspsedTime + "sec";

  // score
  scoreDisplay.textContent = state.score;
  // wpm
  wpmDisplay.textContent = (state.score / (state.elaspsedTime / 60)).toFixed(0);
}
// console.log(splitPhrase.length);
// console.log(getRandomWord());

// => State

const state = {
  currentWord: "",
  score: 0,
  elaspsedTime: 0,
  gameLenght: 30, // 30sec.
};

console.log(startGameButton);

// => Listeners 👂
startGameButton.addEventListener("click", function (event) {
  event.preventDefault();
  startGameButton.className = "hide";

  // show the stats
  statsContent.className = "";
  // show input field
  input.className = "";
  input.focus();

  // display a word
  nextWord();
  // start timer
  startClock();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const userInput = input.value;

  // if no input is entered
  if (userInput === "") {
    return;
  }

  // check is input is correct
  const isCorrect = userInput === state.currentWord;
  let span;
  if (isCorrect) {
    span = createWordSpan("greenyellow", userInput);
    state.score += 1;
  } else {
    span = createWordSpan("red", userInput);
  }

  mainContent.appendChild(span);
  // clear the input
  input.value = "";
  // show next word
  nextWord();
  renderStats();
});
