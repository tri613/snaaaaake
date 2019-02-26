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

const gameCanvas = document.querySelector('#game');
const mapCanvas = document.querySelector('#map');
const gameCtx = prepareCtx(gameCanvas);
const mapCtx = prepareCtx(mapCanvas);

const drawGame = createDrawGame(gameCtx, BOUNDARY, UNIT);
const drawMap = createDrawMap(mapCtx, BOUNDARY, UNIT);

function startGame() {
  const source = createGame(UNIT, BOUNDARY);
  source.subscribe(
    ({ snake, fruit }) => drawGame.draw(snake, fruit),
    error => {
      console.error(error);
      const restart = document.addEventListener('click', e => {
        startGame();
        document.removeEventListener('click', restart);
      });
    }
  );
}

drawMap();
startGame();
