import Snake from './snake';

const UNIT = 20;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = UNIT * 30;
canvas.height = UNIT * 30;

const snake = new Snake(UNIT);

const drawSnake = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.body.forEach(({ x, y }) => {
    ctx.strokeRect(x, y, UNIT, UNIT);
  });
};

function draw() {
  requestAnimationFrame(draw);
  drawSnake();
}

document.addEventListener('keydown', e => {
  switch (e.code) {
    case 'ArrowDown':
      snake.moveDown();
      break;

    case 'ArrowUp':
      snake.moveUp();
      break;

    case 'ArrowRight':
      snake.moveRight();
      break;

    case 'ArrowLeft':
      snake.moveLeft();
      break;

    default:
      break;
  }
});

setInterval(() => snake.moveForward(), 500);
draw();
