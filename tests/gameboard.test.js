import * as gameboard from '../src/gameboard'
import * as ships from '../src/ships'

it('gameboard constructor exists', () => {
    const board = gameboard.GameBoard()
})

it('gameboard size', () => {
    const board = gameboard.GameBoard(12)
    expect(board.length).toBe(12)
})

it('place ship', () => {
    const board = gameboard.GameBoard()
    const ship = ships.Ship(5)
    board.placeShip(0, 0, ship, false)
})

it('place ship bigger than board', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(11)
    expect(() => board.placeShip(0, 0, ship, false)).toThrow('ship overflows the board')
})

it('place ship overflows the board horizontally', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(3)
    expect(() => board.placeShip(8, 0, ship, false)).toThrow('ship overflows the board')
})

it('place ship overflows the board vertically', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(3)
    expect(() => board.placeShip(0, 8, ship, true)).toThrow('ship overflows the board')
})

it('place ship negative coordinates', () => {
    const board = gameboard.GameBoard()
    expect(() => board.placeShip(-1, -1, 5, false)).toThrow('coordinates outside the board')
})

it('place ship outside the board', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(5)
    expect(() => board.placeShip(18, 15, ship, false)).toThrow('coordinates outside the board')
})

it('two ships in the same place', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(5)
    board.placeShip(0, 0, ship, false)
    const anotherShip = ships.Ship(5)
    expect(() => board.placeShip(0, 0, anotherShip, false)).toThrow('there is a ship in the given coordinates')
})

it('two ships in the same place', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(5)
    board.placeShip(0, 0, ship, false)
    const anotherShip = ships.Ship(5)
    expect(() => board.placeShip(3, 0, anotherShip, false)).toThrow('there is a ship in the given coordinates')
})

it('two ships in the same place vertical', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(5)
    board.placeShip(0, 0, ship, true)
    const anotherShip = ships.Ship(4)
    expect(() => board.placeShip(0, 3, anotherShip, true)).toThrow('there is a ship in the given coordinates')
})


it('two ships in the same place cross', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(5)
    board.placeShip(2, 2, ship, false)
    const anotherShip = ships.Ship(6)
    expect(() => board.placeShip(3, 0, anotherShip, true)).toThrow('there is a ship in the given coordinates')
})

it('two ships in the same place cross', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(3)
    board.placeShip(7, 0, ship, false)
    const anotherShip = ships.Ship(4)
    expect(() => board.placeShip(9, 0, anotherShip, true)).toThrow('there is a ship in the given coordinates')
})

it('receive attack misses', () => {
    const n = 10
    const board = gameboard.GameBoard(n)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            expect(board.receiveAttack(i, j)).toBe('miss')
        }
    }
})

it('receive attack valid coordinates', () => {
    const board = gameboard.GameBoard(10)
    expect(() => board.receiveAttack(-10, 9)).toThrow('coordinates outside the board')
    expect(() => board.receiveAttack(11, 9)).toThrow('coordinates outside the board')
    expect(() => board.receiveAttack(1, -9)).toThrow('coordinates outside the board')
    expect(() => board.receiveAttack(1, 19)).toThrow('coordinates outside the board')
})

it('receive attack hits', () => {
    const n = 10
    const board = gameboard.GameBoard(n)
    const ship = ships.Ship(5)
    board.placeShip(0, 0, ship, false)
    expect(board.receiveAttack(0, 0)).toBe('hit')
    expect(board.receiveAttack(1, 0)).toBe('hit')
    expect(board.receiveAttack(2, 0)).toBe('hit')
    expect(board.receiveAttack(3, 0)).toBe('hit')
    expect(board.receiveAttack(4, 0)).toBe('hit')
    expect(board.receiveAttack(5, 0)).toBe('miss')
    expect(board.receiveAttack(0, 1)).toBe('miss')
    expect(board.receiveAttack(0, 2)).toBe('miss')
    expect(board.receiveAttack(0, 3)).toBe('miss')
})

it('receive attack hit ship', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(5)
    const spy = jest.spyOn(ship, 'hit')

    board.placeShip(0, 0, ship, false)
    board.receiveAttack(0, 0)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(0)
    board.receiveAttack(1, 0)
    expect(spy).toHaveBeenCalledWith(1)
    board.receiveAttack(2, 0)
    expect(spy).toHaveBeenCalledWith(2)
    board.receiveAttack(5, 0)
    board.receiveAttack(0, 1)
    board.receiveAttack(0, 2)
    board.receiveAttack(0, 3)
    expect(spy).toHaveBeenCalledTimes(3)
})

it('missed shot valid coordinates', () => {
    const board = gameboard.GameBoard(10)
    expect(() => board.missedShot(-1, 0)).toThrow('coordinates outside the board')
    expect(() => board.missedShot(0, -10)).toThrow('coordinates outside the board')
    expect(() => board.missedShot(11, 0)).toThrow('coordinates outside the board')
    expect(() => board.missedShot(0, 20)).toThrow('coordinates outside the board')
})

it('missed shot new board', () => {
    const n = 10
    const board = gameboard.GameBoard(n)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            expect(board.missedShot(i, j)).toBe(false)
        }
    }
})

it('missed shot shoot all the board', () => {
    const n = 10
    const board = gameboard.GameBoard(n)

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            board.receiveAttack(i, j)
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            expect(board.missedShot(i, j)).toBe(true)
        }
    }
})

it('missed shot shoot at a ship', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(4)
    board.placeShip(0, 0, ship)

    expect(board.missedShot(0, 0)).toBe(false)
})

it('all ship sunk empty board', () => {
    const board = gameboard.GameBoard(10)

    expect(board.allShipSunk()).toBe(false)
})


it('all ship sunk one ship sunk', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(2)
    board.placeShip(0, 0, ship)
    board.receiveAttack(0, 0)
    board.receiveAttack(1, 0)

    expect(board.allShipSunk()).toBe(true)
})

it('all ship sunk two ships', () => {
    const board = gameboard.GameBoard(10)
    const ship = ships.Ship(2)
    board.placeShip(0, 0, ship)
    board.receiveAttack(0, 0)
    board.receiveAttack(1, 0)

    const anotherShip = ships.Ship(4)
    board.placeShip(0, 5, anotherShip)

    expect(board.allShipSunk()).toBe(false)
})