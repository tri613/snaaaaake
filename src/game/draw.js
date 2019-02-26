export const createDrawMap = (ctx, BOUNDARY, UNIT) => () => {
  ctx.beginPath();
  for (let x = 0; x <= BOUNDARY; x += UNIT) {
    for (let y = 0; y <= BOUNDARY; y += UNIT) {
      ctx.strokeStyle = '#e8e8e8';
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
    drawFruit(fruit) {
      ctx.strokeStyle = 'yellow';
      ctx.strokeRect(fruit.x, fruit.y, UNIT, UNIT);
    },
    clear() {
      ctx.clearRect(0, 0, BOUNDARY, BOUNDARY);
    }
  };
};
