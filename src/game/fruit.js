class Fruit {
  constructor(UNIT, BOUNDARY) {
    this.unit = UNIT;
    this.boundary = BOUNDARY;
    this.create();
  }

  random() {
    const steps = this.boundary / this.unit;
    return Math.floor(Math.random() * steps) * this.unit;
  }

  create() {
    this.x = this.random();
    this.y = this.random();
  }

  get pos() {
    return { x: this.x, y: this.y };
  }
}

export default Fruit;
