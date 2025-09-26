import { Ship } from "./ship";

test('Create a ship with a valid length', () => {
    expect(new Ship(1)).toEqual({length: 1, hits: 0, sunk: false});
});

test('Create a ship with an invalid length', () => {
    expect(() => new Ship(0)).toThrow();
    expect(() => new Ship(5)).toThrow();
    expect(() => new Ship(4)).not.toThrow();
});

test('Hit a ship once', () => {
    const ship = new Ship(2);
    expect(ship).toEqual({length: 2, hits: 0, sunk: false});
    ship.hit()
    expect(ship).toEqual({length: 2, hits: 1, sunk: false});
});

test('Check if a 1 length ship is sunk', () => {
    const ship = new Ship(1);

    expect(ship.isSunk()).toBe(false);

    ship.hit();

    expect(ship.isSunk()).toBe(true);
});

test('Check if a 3 length ship is sunk', () => {
    const ship = new Ship(3);

    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});
