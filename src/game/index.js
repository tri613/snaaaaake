import { createGame } from './game';
import { createDrawMap, createDrawGame } from './draw';

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

  function startGame(errorHandler) {
    if (!initialed) {
      drawMap();
      initialed = true;
    }

    const source = createGame(UNIT, BOUNDARY);
    source.subscribe(
      ({ snake, fruit }) => drawGame.draw(snake, fruit),
      errorHandler
    );
  }

  return startGame;
}
