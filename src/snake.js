class Snake {
  constructor(size = 1) {
    this.size = size;
    this.body = [...new Array(3)].map((_, i) => ({
      x: 0,
      y: this.size * (3 - i)
    }));
  }

  get head() {
    return this.body[0];
  }

  get tail() {
    return this.body[this.body.length - 1];
  }

  get direction() {
    const neck = this.body[1];
    // vertical
    if (this.head.x === neck.x) {
      return this.head.y > neck.y ? 'down' : 'up';
    } else {
      return this.head.x > neck.x ? 'right' : 'left';
    }
  }

  move(x, y) {
    this.body.pop();
    this.body.unshift({ x, y });
  }

  moveForward() {
    switch (this.direction) {
      case 'right': {
        this.moveRight();
        break;
      }
      case 'left': {
        this.moveLeft();
        break;
      }
      case 'up': {
        this.moveUp();
        break;
      }
      case 'down': {
        this.moveDown();
        break;
      }
    }
  }

  moveUp() {
    if (this.direction === 'down') {
      return false;
    }
    this.move(this.head.x, this.head.y - this.size);
  }

  moveDown() {
    if (this.direction === 'up') {
      return false;
    }

    const newHead = [this.head.x, this.head.y + this.size];
    this.move(...newHead);
  }

  moveRight() {
    if (this.direction === 'left') {
      return false;
    }
    const newHead = [this.head.x + this.size, this.head.y];
    this.move(...newHead);
  }

  moveLeft() {
    if (this.direction === 'right') {
      return false;
    }

    const newHead = [this.head.x - this.size, this.head.y];
    this.move(...newHead);
  }

  grow() {
    const { x, y } = this.tail;

    let newTail;
    switch (this.direction) {
      case 'up': {
        newTail = [x, y + this.size];
        break;
      }
      case 'down': {
        newTail = [x, y - this.size];
        break;
      }
      case 'left': {
        newTail = [x + this.size, y];
        break;
      }
      case 'right': {
        newTail = [x - this.size, y];
        break;
      }
    }

    this.body.push(newTail);
  }
}

export default Snake;
