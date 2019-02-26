import { createGame } from './game';
import { createDrawMap, createDrawGame } from './draw';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

const UNIT = 20;
const BOUNDARY = UNIT * 30;

function prepareCtx(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = BOUNDARY;
  canvas.height = BOUNDARY;
  ctx.lineWidth = 2;
  return ctx;
}

export function prepareGame(gameCanvas, mapCanvas) {
  const gameCtx = prepareCtx(gameCanvas);
  const mapCtx = prepareCtx(mapCanvas);
  const drawGame = createDrawGame(gameCtx, BOUNDARY, UNIT);
  const drawMap = createDrawMap(mapCtx, BOUNDARY, UNIT);

  let initialed = false;

  function startGame(subscriber, errorHandler) {
    if (!initialed) {
      drawMap();
      initialed = true;
    }

    const subject = new Subject();
    const source = createGame(UNIT, BOUNDARY);
    source.subscribe(subject);

    subject.pipe(tap(console.log));

    // subject.subscribe(source);
    // subject.
    // source.subscribe(({ snake, fruit, score }) => {
    //   drawGame.draw(snake, fruit);
    //   subscriber(score);
    // }, errorHandler);
  }

  return startGame;
}
