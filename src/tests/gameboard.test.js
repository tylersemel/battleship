//gameboard is 10x10 board
import { Gameboard } from "../models/gameboard.js";

test("Create a valid Gameboard", () => {
  const gameboard = new Gameboard();

  expect(gameboard).toEqual({ grid: [] });
});
