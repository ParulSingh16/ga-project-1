// Initiate the game
document.addEventListener("DOMContentLoaded", createGrid);

//define default variables
const up = 38;
const down = 40;
const left = 37;
const right = 39;
const enter = 13;
let gameBoard;
const snakeBody = [0, 1];
let speed = 2;
let foodPosition = 0;
let direction = "Right";
let timer;
let isOver = false;
const scoreDisplay = document.querySelector("#score-display");
let score = 0;

function createGrid() {
  gameBoard = document.querySelector(".game-board");
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "grid-cell");
    gameBoard.appendChild(cell);
  }
  updateSnakeOnScreen();
  generateFood();
}
function scoreBoard() {
  score = score + 1;
  scoreDisplay.textContent = score;
}

// ****** FOOD RELATED FUNCTIONS ******

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

// generateFood will recursively generate a number, check if the number is
// part of the snake body, and if not, it will place food
function generateFood() {
  const randomNumber = getRandomNumber();
  if (gameBoard.children[randomNumber].classList.contains("snake-body")) {
    generateFood();
  } else {
    foodPosition = randomNumber;
    gameBoard.children[foodPosition].classList.add("food");
  }
}

// feedSnake will remove the food and call generateFood function above
function feedSnake() {
  gameBoard.children[foodPosition].classList.remove("food");
  generateFood();
  scoreBoard();
}

// checkForFoodColision is called every time the snake moves
function checkForFoodCollision() {
  if (foodPosition === snakeBody[snakeBody.length - 1]) {
    feedSnake();
    scoreDisplay.textContent = score;
    speed = speed + 1;
  }
}

function startGame() {
  timer = setInterval(moveSnake, 1000 / speed);
}

function moveSnake() {
  removeSnake();
  updateSnakeBody();
  checkForCollision();
  checkForFoodCollision();
  if (!isOver) {
    updateSnakeOnScreen();
  }
}

function handleKeyPress(e) {
  // Enter key is pressed either start the game or set the direction
  if (e.keyCode === enter) {
    startGame();
  }
  if (e.keyCode === left && direction !== "Right") {
    direction = "Left";
  }
  if (e.keyCode === right && direction !== "Left") {
    direction = "Right";
  }
  if (e.keyCode === up && direction !== "Down") {
    direction = "Up";
  }
  if (e.keyCode === down && direction !== "Up") {
    direction = "Down";
  }
}

document.addEventListener("keydown", handleKeyPress);

// removeSnake is called every time the snake moves
function removeSnake() {
  snakeBody.forEach((cell) => {
    gameBoard.children[cell].classList.remove("snake-body");
  });
}

// remove tail will only be called if the snake DOES NOT eat the food
function removeTail() {
  snakeBody.splice(0, 1);
}

// updateSnakeBody will change the snakeBody array by changing the
// head and tail depending on the direction of travel
function updateSnakeBody() {
  const head = snakeBody[snakeBody.length - 1];
  if (direction === "Right") {
    const newHeadPosition = head + 1;
    if (newHeadPosition !== foodPosition) {
      removeTail();
    }
    snakeBody.push(newHeadPosition);
  }
  if (direction === "Left") {
    const newHeadPosition = head - 1;
    if (newHeadPosition !== foodPosition) {
      removeTail();
    }
    snakeBody.push(newHeadPosition);
  }
  if (direction === "Up") {
    const newHeadPosition = head - 10;
    if (newHeadPosition !== foodPosition) {
      removeTail();
    }
    snakeBody.push(newHeadPosition);
  }
  if (direction === "Down") {
    const newHeadPosition = head + 10;
    if (newHeadPosition !== foodPosition) {
      removeTail();
    }
    snakeBody.push(newHeadPosition);
  }
}

// checkForCollision is called every time the updateSnakeBody changes the snakeBody array
function checkForCollision() {
  // checks for colision and ends game if snake passes through a wall
  const head = snakeBody[snakeBody.length - 1];
  const body = snakeBody[snakeBody.length - 2];
  const rowThatHeadIsIn = Math.floor(snakeBody[snakeBody.length - 1] / 10);

  const headPosition = head % 10;
  const bodyPosition = body % 10;

  const headIsInAWall = headPosition === 9 || headPosition === 0;
  const bodyIsInAWall = bodyPosition === 9 || bodyPosition === 0;
  if (
    headIsInAWall &&
    bodyIsInAWall &&
    (direction === "Right" || direction === "Left")
  ) {
    isOver = true;
    clearInterval(timer);
  } else if (
    (rowThatHeadIsIn < 0 || rowThatHeadIsIn > 9) &&
    (direction === "Down" || direction === "Up")
  ) {
    isOver = true;
    clearInterval(timer);
  }
}

// updateSnakeonScreen is called every time we move the snake
function updateSnakeOnScreen() {
  snakeBody.forEach((cell) => {
    gameBoard.children[cell].classList.add("snake-body");
  });
}
