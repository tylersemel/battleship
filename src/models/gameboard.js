import { Ship } from "./ship.js";

const GRID_SIZE = 10;
const BLANK = " ";
const HIT = "X";
const MISS = "O";

export class Gameboard {
  constructor() {
    this.grid = [];
    this.ships = new Map();

    this.#createShips();

    for (let i = 0; i < GRID_SIZE; i++) {
      this.grid[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j] = BLANK;
      }
    }
  }

  getShipNames() {
    let names = [];

    for (const name of this.ships.keys()) {
      names.push(name);
    }

    return names;
  }

  #createShips() {
    this.ships.set("Carrier", new Ship(5));
    this.ships.set("Battleship", new Ship(4));
    this.ships.set("Destroyer", new Ship(3));
    this.ships.set("Submarine", new Ship(3));
    this.ships.set("Patrol Boat", new Ship(2));
  }

  #isValidCoord(x, y) {
    return x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE;
  }

  #isValidPlacement(x, y) {
    return this.#isValidCoord(x, y) && this.grid[x][y] === BLANK;
  }

  //if able to place ship return true, otherwise false
  placeShip(ship, x, y, isHorizontal) {
    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        if (!this.#isValidPlacement(x, y + i)) {
          return false;
        }
      } else {
        if (!this.#isValidPlacement(x + i, y)) {
          return false;
        }
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        this.grid[x][y + i] = ship;
      } else {
        this.grid[x + i][y] = ship;
      }
    }

    return true;
  }

  displayBoard() {
    for (let i = 0; i < GRID_SIZE; i++) {
      let str = "";
      for (let j = 0; j < GRID_SIZE; j++) {
        str += this.grid[i][j];
      }
      console.log(str);
      // console.log("\n");
    }
  }

  receiveAttack(x, y) {
    if (!this.#isValidCoord(x, y)) {
      return false;
    }

    let hasHit = false;

    for (const ship of this.ships.values()) {
      if (this.grid[x][y] === ship) {
        hasHit = true;
        ship.hit();
        break;
      }
    }

    if (!hasHit) {
      this.grid[x][y] = MISS;
    } else {
      this.grid[x][y] = HIT;
    }

    return hasHit;
  }

  hasEveryShipSunk() {
    let allSunk = false;

    for (const ship of this.ships.values()) {
      allSunk = ship.isSunk();
    }

    return allSunk;
  }

  getMissedAttacks() {
    let misses = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.grid[i][j] === MISS) {
          misses.push([i, j]);
        }
      }
    }

    return misses;
  }
}
