const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 2;
let ballDY = -2;
const ballRadius = 10;
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

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// draw balls flying across screen at random angle from random starting points

function drawScore() {
  ctx.font = "16px Roboto";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score.toFixed(1), 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawScore();

  if (rightPressed) {
    ballX += ballDX;
    if (ballX + ballDX > canvas.width - ballRadius) {
      ballX = canvas.width - ballRadius;
    }
  } else if (leftPressed) {
    ballX -= ballDX;
    if (ballX - ballDX < ballRadius) {
      ballX = 0 + ballRadius;
    }
  } else if (upPressed) {
    ballY += ballDY;
    if (ballY + ballDY < ballRadius) {
      ballY = 0 + ballRadius;
    }
  } else if (downPressed) {
    ballY -= ballDY;
    if (ballY - ballDY > canvas.height - ballRadius) {
      ballY = canvas.height - ballRadius;
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
