// Initiates the game
document.addEventListener("DOMContentLoaded", createGrid);

//define default variables
let gameBoard;
const snakeBody = [{ row: 0, column: 0 }];
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
  let newRow;
  let newColumn;
  const head = snakeBody[snakeBody.length - 1]; //this is the head of the snake
  if (direction === "Right") {
    //we are checking which direction snake is moving
    newRow = head.row;
    newColumn = head.column + 1;
  }
  if (direction === "Left") {
    newRow = head.row;
    newColumn = head.column - 1;
  }
  if (direction === "Up") {
    newRow = head.row - 1;
    newColumn = head.column;
  }
  if (direction === "Down") {
    newRow = head.row + 1;
    newColumn = head.column;
  }
  if (newRow > 9 || newRow < 0 || newColumn > 9 || newColumn < 0) {
    clearInterval(timer);
    alert("Game Over!!");
  }
  snakeBody.push({ row: newRow, column: newColumn });
  updateSnakeOnScreen();
}

function updateSnakeOnScreen() {
  const headObject = snakeBody[snakeBody.length - 1]; //{row:1,column:1}
  const tailObject = snakeBody.shift();

  const head = parseInt(headObject.row + "" + headObject.column); //concatenate to get the right cell
  const tail = parseInt(tailObject.row + "" + tailObject.column);

  gameBoard.children[head].classList.add("snake-body");

  // Removes the tail block
  gameBoard.children[tail].classList.remove("snake-body");
  if (foodPosition === head) {
    gameBoard.children[foodPosition].classList.remove("food");
    //if snake eats the food, put the tail back to expand the snake
    snakeBody.unshift(tailObject);
  }
  generateFood();
}
