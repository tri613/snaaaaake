export const createDrawMap = (ctx, BOUNDARY, UNIT) => () => {
  ctx.beginPath();
  for (let x = 0; x <= BOUNDARY; x += UNIT) {
    for (let y = 0; y <= BOUNDARY; y += UNIT) {
      ctx.strokeStyle = '#494b54';
      ctx.rect(x, y, UNIT, UNIT);
    }
  }
  ctx.stroke();
};

export const createDrawGame = (ctx, BOUNDARY, UNIT) => {
  return {
    draw(snake, fruit) {
      this.clear();
      this.drawSnake(snake);
      this.drawFruit(fruit);
    },
    drawSnake([head, ...body]) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#fff';

      ctx.fillStyle = '#ff1ca0';
      ctx.fillRect(head.x, head.y, UNIT, UNIT);
      ctx.strokeRect(head.x, head.y, UNIT, UNIT);

      ctx.fillStyle = '#47ffac';
      body.forEach(({ x, y }) => {
        ctx.fillRect(x, y, UNIT, UNIT);
        ctx.strokeRect(x, y, UNIT, UNIT);
      });
    },
    drawFruit(fruit) {
      ctx.fillStyle = '#ff5119';
      ctx.fillRect(fruit.x, fruit.y, UNIT, UNIT);
    },
    clear() {
      ctx.clearRect(0, 0, BOUNDARY, BOUNDARY);
    }
  };
};
