export const DIRECTIONS = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
};

class Snake {
  constructor(unit, boundary) {
    const initSize = 5;

    this.unit = unit;
    this.boundary = boundary;
    this.direction = DIRECTIONS.down;

    const start = Math.floor((boundary - unit) / 2);

    // this.body = [...new Array(initSize)].map((_, i) => ({
    //   x: this.unit * center,
    //   y: Math.floor(boundary / 2)
    // }));

    this.body = [...new Array(initSize)].map((_, i) => ({
      x: 0,
      y: this.unit * (initSize - i)
    }));
  }

  get head() {
    return this.body[0];
  }

  get tail() {
    return this.body[this.body.length - 1];
  }

  setDirection(nextDirection) {
    const horizontal = [DIRECTIONS.left, DIRECTIONS.right];
    const vertical = [DIRECTIONS.up, DIRECTIONS.down];
    const directions = [this.direction, nextDirection];

    if (
      directions.every(d => horizontal.includes(d)) ||
      directions.every(d => vertical.includes(d))
    ) {
      return false;
    }

    this.direction = nextDirection;
  }

  move(x, y) {
    this.body.pop();
    this.body.unshift({ x, y });
  }

  moveForward() {
    switch (this.direction) {
      case DIRECTIONS.right: {
        this.moveRight();
        break;
      }
      case DIRECTIONS.left: {
        this.moveLeft();
        break;
      }
      case DIRECTIONS.up: {
        this.moveUp();
        break;
      }
      case DIRECTIONS.down: {
        this.moveDown();
        break;
      }
    }
  }

  moveUp() {
    const newHead = [this.head.x, this.head.y - this.unit];
    this.move(...newHead);
  }

  moveDown() {
    const newHead = [this.head.x, this.head.y + this.unit];
    this.move(...newHead);
  }

  moveRight() {
    const newHead = [this.head.x + this.unit, this.head.y];
    this.move(...newHead);
  }

  moveLeft() {
    const newHead = [this.head.x - this.unit, this.head.y];
    this.move(...newHead);
  }

  grow() {
    let newTail;
    const { x: tx, y: ty } = this.tail;
    const { x: bx, y: by } = this.body[this.body.length - 2];

    newTail = {
      x: tx + this.unit * ((tx - bx) / this.unit),
      y: ty + this.unit * ((ty - by) / this.unit)
    };

    if (newTail.x > this.boundary || newTail.x < 0) {
      const dx = newTail.x > this.boundary ? -1 : 1;
      const dy = newTail.y === 0 ? 1 : -1;

      newTail = {
        x: newTail.x + dx * this.unit,
        y: newTail.y + dy * this.unit
      };
    }

    if (newTail.y > this.boundary || newTail.y < 0) {
      const dx = newTail.x === 0 ? 1 : -1;
      const dy = newTail.y > this.boundary ? -1 : 1;

      newTail = {
        x: newTail.x + dx * this.unit,
        y: newTail.y + dy * this.unit
      };
    }

    this.body.push(newTail);
  }
}

export default Snake;
