import { Ship } from "./ship";

test('Create a ship with a valid length', () => {
    expect(new Ship(1)).toEqual({length: 1, hit: 0, sunk: false});
});

test('Create a ship with an invalid length', () => {
    expect(() => new Ship(0)).toThrow();
});

lengths: [1, 2, 3, 4];


const ship = { length: 1, hit: 2, sunk: false };