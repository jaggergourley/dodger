const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let dx = 2;
let dy = -2;
const ballRadius = 10;

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

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if (rightPressed) {
    ballX += dx;
    if (ballX + dx > canvas.width - ballRadius) {
      ballX = canvas.width - ballRadius;
    }
  } else if (leftPressed) {
    ballX -= dx;
    if (ballX - dx < ballRadius) {
      ballX = 0 + ballRadius;
    }
  } else if (upPressed) {
    ballY += dy;
    if (ballY + dy < ballRadius) {
      ballY = 0 + ballRadius;
    }
  } else if (downPressed) {
    ballY -= dy;
    if (ballY - dy > canvas.height - ballRadius) {
      ballY = canvas.height - ballRadius;
    }
  }
}

function startGame() {
  let interval = setInterval(draw, 5); // draw() executed every 10 milliseconds
}

document.getElementById("startButton").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});
