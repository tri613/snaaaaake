import { interval, fromEvent, merge, of } from 'rxjs';
import { map, mapTo, skipUntil, tap, filter, take } from 'rxjs/operators';
import Snake, { DIRECTIONS } from './snake';

function hasHitBoundary(x, y, boundary) {
  return x < 0 || x >= boundary || y < 0 || y >= boundary;
}

function hasHitSelf(head, body) {
  return body.some(({ x: tx, y: ty }) => head.x === tx && head.y === ty);
}

function checkIsGameOver(snakeBody, boundary) {
  const [head, ...rest] = snakeBody;
  if (hasHitBoundary(head.x, head.y, boundary)) {
    throw '撞到牆辣！';
  }

  if (hasHitSelf(head, rest)) {
    throw '撞到自己辣！';
  }
}

export function createGame(UNIT, BOUNDARY) {
  const snake = new Snake(UNIT, BOUNDARY);
  const init = of(snake.body).pipe(
    tap(console.log),
    mapTo(true)
  );

  const keydowns = fromEvent(document, 'keydown').pipe(
    filter(e => e.code.includes('Arrow')),
    map(e => {
      switch (e.code) {
        case 'ArrowUp': {
          snake.setDirection(DIRECTIONS.up);
          break;
        }
        case 'ArrowDown': {
          snake.setDirection(DIRECTIONS.down);
          break;
        }
        case 'ArrowLeft': {
          snake.setDirection(DIRECTIONS.left);
          break;
        }
        case 'ArrowRight': {
          snake.setDirection(DIRECTIONS.right);
          break;
        }
      }
    }),
    mapTo(false)
  );

  const autoMove = interval(100).pipe(
    skipUntil(keydowns),
    map(() => snake.moveForward()),
    mapTo(true)
  );

  return merge(init, keydowns, autoMove).pipe(
    filter(shouldDrawSnake => shouldDrawSnake),
    map(() => checkIsGameOver(snake.body, BOUNDARY)),
    mapTo(snake.body)
  );
}
