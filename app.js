const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
let playerDX = 2;
let playerDY = -2;
const playerRadius = 10;

let ballX;
let ballY;
let ballDX;
let ballDY;
const ballRadius = 10;

let x = 0;
let y = Math.floor(Math.random() * canvas.height); // 0-canvas.height
let dx = Math.random() + 0.5;
let dy = Math.random() / 1.5;

let score = 0.0;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}

function incrementSeconds() {
  score += 0.1;
}

function collisionDetection() {}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerRadius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// function to draw ball flying across screen. We will want it to come from outside at random angle across screen.
// so we need to define x, y, dx, dy randomly.
// if we always wanting it coming from an edge, either x or y has to be 0 or width/height of canvas
// for example, from the left edge, x = 0, y is random from 0 to canvas.height
function drawBall(x, y, dx, dy) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  x += dx;
  y += dy;
}

function drawScore() {
  ctx.font = "16px Roboto";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score.toFixed(1), 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawScore();

  x += dx;
  y += dy;
  drawBall(x, y, dx, dy);

  if (rightPressed) {
    playerX += playerDX;
    if (playerX + playerDX > canvas.width - playerRadius) {
      playerX = canvas.width - playerRadius;
    }
  } else if (leftPressed) {
    playerX -= playerDX;
    if (playerX - playerDX < playerRadius) {
      playerX = 0 + playerRadius;
    }
  } else if (upPressed) {
    playerY += playerDY;
    if (playerY + playerDY < playerRadius) {
      playerY = 0 + playerRadius;
    }
  } else if (downPressed) {
    playerY -= playerDY;
    if (playerY - playerDY > canvas.height - playerRadius) {
      playerY = canvas.height - playerRadius;
    }
  }
}

function startGame() {
  let drawInterval = setInterval(draw, 5); // draw() executed every 10 milliseconds
  let timeInterval = setInterval(incrementSeconds, 100);
}

document.getElementById("startButton").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});

/* to implement:
- render objects that will fly across screen
- collision detection (maybe add lives)
*/
