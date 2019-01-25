import { interval, fromEvent, race } from 'rxjs';
import { throttle, tap, map } from 'rxjs/operators';
import Snake from './snake';

const UNIT = 20;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = UNIT * 30;
canvas.height = UNIT * 30;

const snake = new Snake(UNIT);
let queue = [];

const drawSnake = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.body.forEach(({ x, y }) => {
    ctx.strokeRect(x, y, UNIT, UNIT);
  });
};

function draw() {
  requestAnimationFrame(draw);

  while (queue.length) {
    const move = queue.pop();
    move();
  }
  drawSnake();
}

function handleKeydown(e) {
  switch (e.code) {
    case 'ArrowDown':
      queue.push(snake.moveDown.bind(snake));
      break;

    case 'ArrowUp':
      queue.push(snake.moveUp.bind(snake));
      break;

    case 'ArrowRight':
      queue.push(snake.moveRight.bind(snake));
      break;

    case 'ArrowLeft':
      queue.push(snake.moveLeft.bind(snake));
      break;

    default:
      break;
  }
}

const keydowns = fromEvent(document, 'keydown').pipe(
  tap(console.log),
  map(handleKeydown)
);
const autoMove = interval(1000).pipe(
  tap(console.log),
  map(() => snake.moveForward())
);
// const obs = race(autoMove, keydowns);
const obs = autoMove.pipe(throttle(() => keydowns));
obs.subscribe();

// setInterval(() => queue.push(snake.moveForward.bind(snake)), 1000);
draw();
