import { interval, fromEvent, merge, of } from 'rxjs';
import { map, bufferTime, mapTo, skipUntil, tap, take } from 'rxjs/operators';
import Snake from './snake';

function hitBoundary(x, y, boundary) {
  return x < 0 || x >= boundary || y < 0 || y >= boundary;
}

function grow(tail, butt, unit) {
  const { x: tx, y: ty } = tail;
  const { x: bx, y: by } = butt;

  if (tx < bx) {
    return { x: tx - unit, y: ty };
  }

  if (tx > bx) {
    return { x: tx + unit, y: ty };
  }

  if (by > ty) {
    return { x: tx, y: ty - unit };
  }

  if (by < ty) {
    return { x: tx, y: ty + unit };
  }
}

export function createGame(UNIT, BOUNDARY) {
  const snake = new Snake(UNIT);

  const init = of(snake.body);
  const keydowns = fromEvent(document, 'keydown').pipe(
    map(e => e.code.replace('Arrow', 'move'))
  );
  const autoMove = interval(1000).pipe(mapTo('moveForward'));

  const grow = interval(300).pipe(
    map(() => {
      let newTail;
      newTail = grow(snake.tail, snake.body[snake.body.length - 2], UNIT);

      if (x > BOUNDARY) {
      }
    })
  );

  const listeners = merge(keydowns, autoMove, grow).pipe(
    skipUntil(keydowns),
    bufferTime((60 / 1000) * 3),
    map(actions => {
      const fromKeyboardMovements = actions.filter(
        action => action !== 'moveForward'
      );
      if (fromKeyboardMovements.length) {
        return fromKeyboardMovements;
      }
      return actions;
    }),
    map(actions => {
      actions.forEach(action => snake[action]());
      return snake.body;
    }),
    map(body => {
      const [head, ...rest] = body;

      if (hitBoundary(head.x, head.y, BOUNDARY)) {
        throw '撞到牆辣！';
      }

      if (rest.some(({ x, y }) => head.x === x && head.y === y)) {
        throw '撞到自己辣！';
      }

      return body;
    })
  );

  return merge(init, listeners);
}
