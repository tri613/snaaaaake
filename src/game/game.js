import { interval, fromEvent, merge, of, throwError } from 'rxjs';
import { map, mapTo, skipUntil, tap, filter, mergeMap } from 'rxjs/operators';
import Snake, { DIRECTIONS } from './snake';
import Fruit from './fruit';

function hasHitBoundary(x, y, boundary) {
  return x < 0 || x >= boundary || y < 0 || y >= boundary;
}

function hasHitSelf(head, body) {
  return body.some(({ x: tx, y: ty }) => head.x === tx && head.y === ty);
}

function checkIsGameOver(snakeBody, boundary) {
  const [head, ...rest] = snakeBody;
  if (hasHitBoundary(head.x, head.y, boundary)) {
    return '撞到牆辣！';
  }

  if (hasHitSelf(head, rest)) {
    return '撞到自己辣！';
  }
}

const POINT = 10;

export function createGame(UNIT, BOUNDARY) {
  const snake = new Snake(UNIT, BOUNDARY);
  const fruit = new Fruit(UNIT, BOUNDARY);
  let score = 0;

  const init = of(snake.body).pipe(mapTo(true));

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
    map(snake.moveForward.bind(snake)),
    mapTo(true)
  );

  return merge(init, keydowns, autoMove).pipe(
    filter(shouldDrawSnake => shouldDrawSnake),
    mergeMap(() => {
      // check if eat fruit
      if (snake.head.x === fruit.x && snake.head.y === fruit.y) {
        snake.grow();
        fruit.create();
        score += POINT;
      }

      const error = checkIsGameOver(snake.body, BOUNDARY);
      return error
        ? throwError(error)
        : of({
            snake: snake.body,
            fruit: fruit.pos,
            score
          });
    })
  );
}
