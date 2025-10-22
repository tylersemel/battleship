//gameboard is 10x10 board
import { Gameboard } from "../models/gameboard.js";

test("Check that the start grid is empty", () => {
  const gameboard = new Gameboard();

  expect(gameboard.grid).toEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);
});

test("Have starting ships", () => {
  const gameboard = new Gameboard();

  expect(gameboard.ships.size).toEqual(5);
  expect(gameboard.ships[0]).toEqual({ length: 5, hits: 0, sunk: false });
});

test("Place a 5 length ship horizontally at coord [0, 0]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  gameboard.placeShip(carrier, 0, 0, true);

  expect(gameboard.grid[0][0]).toEqual(carrier);
  expect(gameboard.grid[0][1]).toEqual(carrier);
  expect(gameboard.grid[0][2]).toEqual(carrier);
  expect(gameboard.grid[0][3]).toEqual(carrier);
  expect(gameboard.grid[0][4]).toEqual(carrier);
  expect(gameboard.grid[0][5]).not.toEqual(carrier);
  expect(gameboard.grid[0][5]).toEqual(" ");
});
