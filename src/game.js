import { interval, fromEvent, merge, of } from 'rxjs';
import { map, bufferTime, mapTo, skipUntil, tap } from 'rxjs/operators';
import Snake from './snake';

export const UNIT = 20;
const snake = new Snake(UNIT);

function handleKeydown(e) {
  switch (e.code) {
    case 'ArrowDown':
      return 'moveDown';

    case 'ArrowUp':
      return 'moveUp';

    case 'ArrowRight':
      return 'moveRight';

    case 'ArrowLeft':
      return 'moveLeft';

    default:
      break;
  }
}

const init = of(snake.body);
const keydowns = fromEvent(document, 'keydown').pipe(map(handleKeydown));
const autoMove = interval(1000).pipe(mapTo('moveForward'));

const listeners = merge(autoMove, keydowns).pipe(
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
    if (rest.some(({ x, y }) => head.x === x && head.y === y)) {
      throw Error('撞到自己辣！');
    }
    return body;
  })
);

export const source = merge(init, listeners);
