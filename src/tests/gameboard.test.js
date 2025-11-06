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

test("Hit a horizontally placed 5 length ship at [0, 0]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  expect(gameboard.placeShip(carrier, 0, 0, true)).toBeTruthy();
  expect(gameboard.grid[0][0]).toEqual(carrier);
  expect(gameboard.ships.get("Carrier")).toEqual(gameboard.grid[0][0]);

  expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
  expect(gameboard.grid[0][0]).toEqual("X");
  expect(gameboard.grid[0][1]).toEqual(carrier);
});

test("Miss a horizontally placed 5 length ship at [0, 0]", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  expect(gameboard.placeShip(carrier, 0, 0, true)).toBeTruthy();
  expect(gameboard.grid[0][0]).toEqual(carrier);
  expect(gameboard.ships.get("Carrier")).toEqual(gameboard.grid[0][0]);

  expect(gameboard.receiveAttack(3, 3)).toBeFalsy();
  expect(gameboard.grid[0][0]).toEqual(carrier);
  expect(gameboard.grid[3][3]).toEqual("O");
});

test("Try to hit a coordinate not in the grid", () => {
  const gameboard = new Gameboard();

  expect(gameboard.receiveAttack(11, 3)).toBeFalsy();
  expect(gameboard.grid[0][0]).toEqual(" ");
});

test("Sink a 3 length ship", () => {
  const gameboard = new Gameboard();
  const destroyer = gameboard.ships.get("Destroyer");

  expect(gameboard.placeShip(destroyer, 0, 0, true)).toBeTruthy();
  expect(gameboard.grid[0][0]).toEqual(destroyer);
  expect(gameboard.ships.get("Destroyer")).toEqual(gameboard.grid[0][0]);

  expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
  expect(gameboard.receiveAttack(0, 1)).toBeTruthy();
  expect(gameboard.receiveAttack(0, 2)).toBeTruthy();
  expect(gameboard.grid[0][0]).toEqual("X");
  expect(gameboard.grid[0][1]).toEqual("X");
  expect(gameboard.grid[0][1]).toEqual("X");

  expect(destroyer.hits).toEqual(3);
  expect(destroyer.isSunk()).toBeTruthy;
});

test("Place every ship and check if they are not sunk", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  gameboard.placeShip(carrier, 1, 1, true);
  gameboard.placeShip(gameboard.ships.get("Battleship"), 3, 3, false);
  gameboard.placeShip(gameboard.ships.get("Destroyer"), 4, 8, false);
  gameboard.placeShip(gameboard.ships.get("Submarine"), 8, 4, true);
  gameboard.placeShip(gameboard.ships.get("Patrol Boat"), 9, 0, true);

  expect(gameboard.grid[1][4]).toEqual(carrier);
  expect(gameboard.hasEveryShipSunk()).toBeFalsy();
});

test("Place every ship and check if all are are sunk", () => {
  const gameboard = new Gameboard();
  const carrier = gameboard.ships.get("Carrier");

  gameboard.placeShip(carrier, 1, 1, true);
  gameboard.placeShip(gameboard.ships.get("Battleship"), 3, 3, false);
  gameboard.placeShip(gameboard.ships.get("Destroyer"), 4, 8, false);
  gameboard.placeShip(gameboard.ships.get("Submarine"), 8, 4, true);
  gameboard.placeShip(gameboard.ships.get("Patrol Boat"), 9, 0, true);

  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();

  expect(carrier.isSunk()).toBeTruthy();

  gameboard.ships.get("Battleship").hit();
  gameboard.ships.get("Battleship").hit();
  gameboard.ships.get("Battleship").hit();
  gameboard.ships.get("Battleship").hit();

  expect(gameboard.ships.get("Battleship").isSunk()).toBeTruthy();

  gameboard.ships.get("Destroyer").hit();
  gameboard.ships.get("Destroyer").hit();
  gameboard.ships.get("Destroyer").hit();

  expect(gameboard.ships.get("Destroyer").isSunk()).toBeTruthy();

  gameboard.ships.get("Submarine").hit();
  gameboard.ships.get("Submarine").hit();
  gameboard.ships.get("Submarine").hit();

  expect(gameboard.ships.get("Submarine").isSunk()).toBeTruthy();

  gameboard.ships.get("Patrol Boat").hit();
  gameboard.ships.get("Patrol Boat").hit();

  expect(gameboard.ships.get("Patrol Boat").isSunk()).toBeTruthy();

  expect(gameboard.hasEveryShipSunk()).toBeTruthy();
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
