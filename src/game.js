import { interval, fromEvent, merge, of } from 'rxjs';
import { map, bufferTime, mapTo, skipUntil, tap, take } from 'rxjs/operators';
import Snake from './snake';

export function createGame(unit, boundary) {
  const snake = new Snake(unit);

  const init = of(snake.body);
  const keydowns = fromEvent(document, 'keydown').pipe(
    map(e => e.code.replace('Arrow', 'move'))
  );
  const autoMove = interval(1000).pipe(mapTo('moveForward'));
  const grow = interval(300).pipe(mapTo('grow'));

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

      if (
        head.x < 0 ||
        head.x >= boundary ||
        head.y < 0 ||
        head.y >= boundary
      ) {
        throw '撞到自己辣！';
      }

      if (rest.some(({ x, y }) => head.x === x && head.y === y)) {
        throw '撞到自己辣！';
      }

      return body;
    })
  );

  return merge(init, listeners);
}
