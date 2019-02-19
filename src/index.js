import { createGame } from './game';

const UNIT = 20;
const BOUNDARY = UNIT * 30;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = BOUNDARY;
canvas.height = BOUNDARY;

const drawMap = () => {};

const drawSnake = ([head, ...body]) => {
  console.log('drawSnake');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#FF0000';
  ctx.strokeRect(head.x, head.y, UNIT, UNIT);

  ctx.strokeStyle = '#000';
  body.forEach(({ x, y }) => {
    ctx.strokeRect(x, y, UNIT, UNIT);
  });
};

const source = createGame(UNIT, BOUNDARY);
const cancel = source.subscribe(drawSnake, console.error);
