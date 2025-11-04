import { Ship } from "./ship.js";

const GRID_SIZE = 10;
const BLANK = " ";
const HIT = "X";
const MISS = "O";
const SHIPS = [
  "Carrier",
  "Battleship",
  "Destroyer",
  "Submarine",
  "Patrol Boat",
];

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

  //have 5 ships on gameboard

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

  #getShipCoordinates(name) {}

  //if able to place ship return true, otherwise false
  placeShip(ship, x, y, isHorizontal) {
    if (!this.#isValidCoord(x, y)) {
      return false;
    }

    if (isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        if (this.#isValidCoord(x, y + i) && this.grid[x][y + i] === BLANK) {
          this.grid[x][y + i] = ship;
        } else {
          return false;
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.#isValidCoord(x + i, y) && this.grid[x + i][y] === BLANK) {
          this.grid[x + i][y] = ship;
        } else {
          return false;
        }
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

  receiveAttack(x, y) {}
}
