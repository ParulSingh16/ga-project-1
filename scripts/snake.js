// Initiate the game
document.addEventListener("DOMContentLoaded", createGrid);

//define default variables
let gameBoard;
const snakeBody = [0, 1, 2, 3, 4, 5];
const speed = 2;
let foodPosition = 0;
let direction = "Right";
let timer;

function createGrid() {
  gameBoard = document.querySelector(".game-board");
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "grid-cell");
    gameBoard.appendChild(cell);
  }
  gameBoard.children[0].classList.add("snake-body");
  generateFood();
}

function generateFood() {
  while (gameBoard.children[foodPosition].classList.contains("snake-body")) {
    foodPosition = Math.floor(Math.random() * 100);
  }
  gameBoard.children[foodPosition].classList.add("food");
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  // Enter key is pressed
  if (e.keyCode === 13) {
    startGame();
  }
  const up = 38;
  const down = 40;
  const left = 37;
  const right = 39;
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

function startGame() {
  timer = setInterval(moveSnake, 1000 / speed);
}

function moveSnake() {
  snakeBody.forEach((cell) => {
    gameBoard.children[cell].classList.remove("snake-body");
  });
  const head = snakeBody[snakeBody.length - 1]; //this is the head of the snake
  if (direction === "Right") {
    snakeBody.splice(0, 1); //removes the first element from the array(removes position 0)
    snakeBody.push(head + 1);
    //we are checking which direction snake is moving
  }
  if (direction === "Left") {
    snakeBody.splice(0, 1); //removes the first element from the array(removes position 0)
    snakeBody.push(head - 1);
  }
  if (direction === "Up") {
    snakeBody.splice(0, 1); //removes the first element from the array(removes position 0)
    snakeBody.push(head - 10);
  }
  if (direction === "Down") {
    snakeBody.splice(0, 1); //removes the first element from the array(removes position 0)
    snakeBody.push(head + 10);
  }

  updateSnakeOnScreen();
}

function updateSnakeOnScreen() {
  snakeBody.forEach((cell) => {
    gameBoard.children[cell].classList.add("snake-body");
  });
  const head = snakeBody[snakeBody.length - 1];
  const x = head % 10;
  const rightHandwall = x === 9;
  console.log(rightHandwall, direction);
  const leftHandwall = x === 0; // if the head is going to be in or not
  if (rightHandwall && direction === "Right") {
    alert("Game Over!!");
  }

  if (foodPosition === head) {
    gameBoard.children[foodPosition].classList.remove("food");
    //if snake eats the food, put the tail back to expand the snake
    //snakeBody.unshift(tailObject);
  }
  generateFood();
}
