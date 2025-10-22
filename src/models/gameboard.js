import { Ship } from "./ship";

const GRID_SIZE = 10;

export class Gameboard {
  constructor() {
    this.grid = [];
    this.ships = new Map();

    this.#createShips();

    for (let i = 0; i < GRID_SIZE; i++) {
      this.grid[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j] = " ";
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

  placeShip(ship, x, y, isHorizontal) {
    this.grid[x][y] = ship;
  }

  receiveAttack(x, y) {}
}
