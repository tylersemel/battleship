class Ship {
  constructor(length) {
    if (this.#checkValidLength(length)) {
      this.length = length;
    } else {
      throw new Error("Length needs to be between 1 and 4 units.");
    }

    this.hits = 0;
    this.sunk = false;
  }

  #checkValidLength(length) {
    return !(length <= 0 || length > 5);
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }

    return this.sunk;
  }
}

export { Ship };
