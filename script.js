//setup
let mode = "hard";
let colors = [];
let correctColor;
var squares = document.querySelectorAll(".square");
resetGame();

function resetGame() {
  generateColors();
  correctColor = colors[getRandomInteger(colors.length)];
  squares.forEach((squareEl, index) => {
    squareEl.style.backgroundColor = colors[index];
  });

  var colorDisplay = document.querySelector("#colorDisplay");
  colorDisplay.innerHTML = correctColor;
}

function generateColors() {
  if (mode === "hard") {
    for (let i = 0; i < squares.length; i++) {
      colors.push(
        `rgb(${getRandomInteger(255)}, ${getRandomInteger(
          255
        )}, ${getRandomInteger(255)})`
      );
    }
  } else {
    for (let i = 0; i < squares.length / 2; i++) {
      colors.push(
        `rgb(${getRandomInteger(255)}, ${getRandomInteger(
          255
        )}, ${getRandomInteger(255)})`
      );
    }
  }
}

//generate and display color for guessing
// var correctColor = colors[getRandomInteger(colors.length)];
// var colorDisplay = document.querySelector("#colorDisplay");
// colorDisplay.innerHTML = correctColor;

//returns random integer between 0 and max
function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

//reset button functionality
var resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetGame);

//mode button functionality
var modeButtons = document.querySelectorAll(".mode");
modeButtons.forEach(button => {
  button.addEventListener("click", selectMode);
});

function selectMode() {
  //remove button highlight first
  modeButtons.forEach(button => {
    button.classList.remove("selected");
  });
  //add button highlight to clicked button
  this.classList.add("selected");

  if (this.innerHTML === "Easy") {
    mode = "easy";
    squares.forEach((square, index) => {
      if (index >= 3) {
        square.style.display = "none";
      }
    });
  } else {
    mode = "hard";
    squares.forEach(square => {
      square.style.display = "block";
    });
  }
}

//game functionality
var header = document.querySelector("h1");
var message = document.querySelector("#message");

squares.forEach(squareEl => {
  squareEl.addEventListener("click", checkColor);
});

function checkColor() {
  let pickedColor = this.style.backgroundColor;
  if (pickedColor === correctColor) {
    message.innerHTML = "Correct!";
    resetButton.innerHTML = "Play Again?";
    squares.forEach(squareEl => {
      squareEl.style.backgroundColor = correctColor;
    });
    header.style.backgroundColor = correctColor;
  } else {
    message.innerHTML = "Try Again";
    this.style.backgroundColor = "#232323";
  }
}
