import { createGame } from './game';
import { createDrawMap, createDrawGame } from './draw';
import { Subject } from 'rxjs';
import { distinctUntilChanged, tap, map } from 'rxjs/operators';

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

  let init = false;

  function startGame(errorHandler) {
    if (!init) {
      drawMap();
      init = true;
    }

    const subject = new Subject();
    const source = createGame(UNIT, BOUNDARY);

    subject.subscribe(({ snake, fruit }) => {
      drawGame.draw(snake, fruit);
    }, errorHandler);

    const score = subject.pipe(
      map(({ score }) => score),
      distinctUntilChanged()
    );

    source.subscribe(subject);

    return { score };
  }

  return startGame;
}
