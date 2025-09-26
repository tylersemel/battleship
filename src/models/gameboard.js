const GRID_SIZE = 10;

export class Gameboard {
  constructor() {
    this.grid = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j] = 0;
      }
    }
  }
}
