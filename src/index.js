import { createGame } from './game';

const UNIT = 20;
const BOUNDARY = UNIT * 30;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = BOUNDARY;
canvas.height = BOUNDARY;
ctx.lineWidth = 2;

const draw = {
  drawMap() {
    ctx.beginPath();
    for (let x = 0; x <= BOUNDARY; x += UNIT) {
      for (let y = 0; y <= BOUNDARY; y += UNIT) {
        ctx.strokeStyle = '#e8e8e8';
        ctx.rect(x, y, UNIT, UNIT);
      }
    }
    ctx.stroke();
  },
  drawSnake([head, ...body]) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(head.x, head.y, UNIT, UNIT);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    body.forEach(({ x, y }) => {
      ctx.rect(x, y, UNIT, UNIT);
    });
    ctx.stroke();
  },
  redraw(snakeBody) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawMap();
    this.drawSnake(snakeBody);
  }
};

function startGame() {
  const source = createGame(UNIT, BOUNDARY);
  source.subscribe(
    snakeBody => draw.redraw(snakeBody),
    error => {
      console.log('game over', error);
      startGame();
    }
  );
}

startGame();
