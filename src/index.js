import { UNIT, source } from './game';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = UNIT * 30;
canvas.height = UNIT * 30;

const drawSnake = body => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  body.forEach(({ x, y }) => {
    ctx.strokeRect(x, y, UNIT, UNIT);
  });
};

source.subscribe(drawSnake, console.error);
