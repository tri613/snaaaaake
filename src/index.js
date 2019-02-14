import { interval, fromEvent, from } from 'rxjs';
import {
  throttle,
  tap,
  map,
  merge,
  combineLatest,
  throttleTime
} from 'rxjs/operators';
import Snake from './snake';

const UNIT = 20;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = UNIT * 30;
canvas.height = UNIT * 30;

const snake = new Snake(UNIT);
let queue = [];

const drawSnake = body => {
  console.log('draw snake', body);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  body.forEach(({ x, y }) => {
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
}

const keydowns = fromEvent(document, 'keydown').pipe(
  map(handleKeydown),
  tap(next => console.log('key', snake.body))
);

// const autoMove = interval(1000).pipe(map(() => snake.moveForward()));

const body = from(snake.body).pipe(
  concat(keydowns),
  map(() => snake.body),
  tap(console.log)
);

// const obs = race(autoMove, keydowns);
// const obs = autoMove.pipe(throttle(() => keydowns));
// obs.subscribe();
// keydowns.subscribe();
body.subscribe(drawSnake);

// setInterval(() => drawSnake(snake.body), 500);
// draw();
