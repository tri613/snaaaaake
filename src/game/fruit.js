class Fruit {
  constructor(unit, boundary) {
    this.unit = unit;
    this.boundary = boundary;
  }

  random() {
    const steps = this.boundary / this.unit;
    return Math.floor(Math.random() * steps) * this.unit;
  }

  genNextPos() {
    this.x = this.random();
    this.y = this.random();
  }

  create(snake) {
    let count = 3;
    this.genNextPos();

    while (
      snake.some(body => body.x === this.x && body.y === this.y) &&
      count > 0
    ) {
      this.genNextPos();
      count--;
    }
  }

  get pos() {
    return { x: this.x, y: this.y };
  }
}

export default Fruit;
