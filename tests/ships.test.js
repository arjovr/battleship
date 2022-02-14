import * as ships from '../src/ships'

it('ship constructor exists', () => {
    const myShip = new ships.Ship()
})

it('ship constructor has a length', () => {
    const myShip = new ships.Ship(18)
    expect(myShip.length).toBe(18)
})

it('hits', () => {
    const myShip = ships.Ship(4)
    expect(myShip.hits).toEqual([false, false, false, false])
})

it('hit function', () => {
    const myShip = ships.Ship(5)
    myShip.hit(2)
    expect(myShip.hits).toEqual([false, false, true, false, false])
})

it('hit function overflow', () => {
    const myShip = ships.Ship(5)
    expect(() => myShip.hit(6)).toThrow('index out of range')
})

it('hit function negative', () => {
    const myShip = ships.Ship(5)
    expect(() => myShip.hit(-1)).toThrow('index out of range')
})

it('isSunk new', () => {
    const myShip = ships.Ship(3)
    expect(myShip.isSunk()).toBe(false)
})

it('isSunk hitted', () => {
    const myShip = ships.Ship(3)
    myShip.hit(0)
    myShip.hit(1)
    expect(myShip.isSunk()).toBe(false)
})

it('isSunk completely hitted', () => {
    const myShip = ships.Ship(3)
    myShip.hit(0)
    myShip.hit(1)
    myShip.hit(2)
    expect(myShip.isSunk()).toBe(true)
})

it('ship constructor must be positive', () => {
    expect(() => {
        ships.Ship(0)
    }).toThrow()
})