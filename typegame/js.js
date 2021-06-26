window.addEventListener("load", init);

// Globals

// Available Levels
const levels = {
  easy: 20,
  medium: 10,
  hard: 5,
};

// To change level
let currentLevel = 0;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input"),
  currentWord = document.querySelector("#current-word"),
  scoreDisplay = document.querySelector("#score"),
  timeDisplay = document.querySelector("#time"),
  message = document.querySelector("#message"),
  seconds = document.querySelector("#seconds");

const popdiv = document.getElementById("pop"),
  popLevelDiv = document.getElementById("popLevelDiv"),
  LevelValue = document.querySelector("input[name=level]");
(popBtn = document.getElementById("popBtn")),
  (score2 = document.getElementById("score2"));

popBtn.addEventListener("click", function () {
  location.reload(true);
});

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
];

// Initialize Game
function init() {
  popLevelDiv.style.display = "flex";
  document
    .getElementById("popLevel")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector("#hard").checked
        ? (currentLevel = levels.hard)
        : document.querySelector("#mediam").checked
        ? (currentLevel = levels.medium)
        : (currentLevel = levels.easy);
      popLevelDiv.style.display = "none";

      // Show number of seconds in UI
      time = currentLevel;
      seconds.innerHTML = currentLevel;
      // Load word from array
      showWord(words);
      // Start matching on word input
      wordInput.addEventListener("input", ()=>{
        if (matchWords()) {
          isPlaying = true;
          time = currentLevel + 1;
          showWord(words);
          wordInput.value = "";
          score++;
        }
      
        // If score is -1, display 0
        if (score === -1) {
          scoreDisplay.innerHTML = 0;
        } else {
          scoreDisplay.innerHTML = score;
        }
      });
      // Call countdown every second
      setInterval(countdown, 1000);
      // Check game status
      setInterval(checkStatus, 50);
    });
}


// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
    popdiv.style.display = "flex";
    score2.innerText = scoreDisplay.innerText;
  }
}
