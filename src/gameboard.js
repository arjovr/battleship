import * as ships from './ships'

const cell = (ship, offset, missedShot = false) => {
    return {
        ship,
        offset,
        missedShot
    }
}

const _board = {
    placeShip(x, y, ship, isVertical = false) {
        // the ships begins at top left and extends to bottom right.
        if (x < 0 || y < 0 || x >= this.length || y >= this.length) {
            throw RangeError('coordinates outside the board')
        }

        if (!isVertical && x + ship.length > this.length) {
            throw RangeError('ship overflows the board')
        }

        if (isVertical && y + ship.length > this.length) {
            throw RangeError('ship overflows the board')
        }

        this.ships.push(ship)

        const zero = isVertical ? y : x;

        for (let i = zero; i < zero + ship.length; i++) {
            const _x = isVertical ? x : i
            const _y = isVertical ? i : y
            const currentCell = this.table[_x][_y]
            if (currentCell.ship) {
                throw Error('there is a ship in the given coordinates')
            } else {
                this.table[_x][_y] = cell(ship, i - zero)
            }
        }
    },
    receiveAttack(x, y) {
        if (x < 0 || y < 0 || x >= this.length || y >= this.length) {
            throw RangeError('coordinates outside the board')
        }
        const cell = this.table[x][y]
        if (cell.ship) {
            cell.ship.hit(cell.offset)
            return 'hit'
        }
        cell.missedShot = true
        return 'miss'
    },
    missedShot(x, y) {
        if (x < 0 || y < 0 || x >= this.length || y >= this.length) {
            throw RangeError('coordinates outside the board')
        }
        const cell = this.table[x][y]
        return cell.missedShot
    },
    allShipSunk() {
        if (this.ships.length == 0) {
            return false
        }
        return this.ships.every(x => x.isSunk())
    }
}

const GameBoard = function (length = 10) {
    const board = Object.create(_board)
    board.length = length
    board.table = []
    board.ships = []
    for (let i = 0; i < length; i++) {
        let row = []
        for (let j = 0; j < length; j++) {
            row.push(cell())
        }
        board.table.push(row)
    }
    return board
}

export { GameBoard }
