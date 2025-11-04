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
  expect(gameboard.ships.get("Carrier")).toEqual({
    length: 5,
    hits: 0,
    sunk: false,
  });

  expect(gameboard.ships.get("Patrol Boat")).toEqual({
    length: 2,
    hits: 0,
    sunk: false,
  });
});

test("Place a 5 length ship horizontally at coord [0, 0]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  expect(carrier).toEqual({
    hits: 0,
    length: 5,
    sunk: false,
  });

  expect(gameboard.placeShip(carrier, 0, 0, true)).toBeTruthy();

  expect(gameboard.grid[0][0]).toEqual(carrier);
  expect(gameboard.grid[0][1]).toEqual(carrier);
  expect(gameboard.grid[0][2]).toEqual(carrier);
  expect(gameboard.grid[0][3]).toEqual(carrier);
  expect(gameboard.grid[0][4]).toEqual(carrier);
  expect(gameboard.grid[0][5]).not.toEqual(carrier);
});

test("Try to place a 5 length ship horizontally at invalid coord [0, 7]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  expect(carrier).toEqual({
    hits: 0,
    length: 5,
    sunk: false,
  });

  expect(gameboard.placeShip(carrier, 0, 7, true)).toBeFalsy();

  expect(gameboard.grid[0][7]).toEqual(" ");
  expect(gameboard.grid[0][8]).toEqual(" ");
  expect(gameboard.grid[0][9]).toEqual(" ");
  expect(gameboard.grid[0][7]).not.toEqual(carrier);
});

test("Try to place a 5 length ship vertically at invalid coord [0, 7]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  expect(carrier).toEqual({
    hits: 0,
    length: 5,
    sunk: false,
  });

  expect(gameboard.placeShip(carrier, 7, 0, false)).toBeFalsy();

  expect(gameboard.grid[7][0]).toEqual(" ");
  expect(gameboard.grid[8][0]).toEqual(" ");
  expect(gameboard.grid[9][0]).toEqual(" ");
  expect(gameboard.grid[7][0]).not.toEqual(carrier);
});

test("Place a 5 length ship vertically at coord [0, 0]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  expect(gameboard.placeShip(carrier, 0, 0, false)).toBeTruthy();

  expect(gameboard.grid[0][0]).toEqual(carrier);
  expect(gameboard.grid[1][0]).toEqual(carrier);
  expect(gameboard.grid[2][0]).toEqual(carrier);
  expect(gameboard.grid[3][0]).toEqual(carrier);
  expect(gameboard.grid[4][0]).toEqual(carrier);
  expect(gameboard.grid[5][0]).not.toEqual(carrier);
});

// -XCCCC^^^^
// ^O^^^^^^^^
// ^^^^^^^^^^
// ^B^^^^^^^^
// ^B^^^^^^^^
// ^X^^^^^^^^
// ^B^^^^^^^^
// ^^^^^^^^^^
// ^^^^^^^^^^
// ^^^^^^^^^^
