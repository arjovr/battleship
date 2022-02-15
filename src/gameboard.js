import * as ships from './ships'

const cell = (ship, offset, missedShot = false, hitted = false) => {
    return {
        ship,
        offset,
        missedShot,
        hitted
    }
}

const _board = {
    placeShip(x, y, ship, isHorizontal = false) {
        // the ships begins at top left and extends to bottom right.
        if (x < 0 || y < 0 || x >= this.length || y >= this.length) {
            throw RangeError('coordinates outside the board')
        }

        if (!isHorizontal && x + ship.length > this.length) {
            throw RangeError('ship overflows the board')
        }

        if (isHorizontal && y + ship.length > this.length) {
            throw RangeError('ship overflows the board')
        }

        this.ships.push(ship)

        const zero = isHorizontal ? y : x;
        let fits = true;

        for (let i = zero; i < zero + ship.length; i++) {
            const _x = isHorizontal ? x : i
            const _y = isHorizontal ? i : y
            const currentCell = this.table[_x][_y]
            if (currentCell.ship) {
                fits = false
                break
            } else {
                this.table[_x][_y] = cell(ship, i - zero)
            }
        }
        if (!fits) {
            for (let i = zero; i < zero + ship.length; i++) {
                const _x = isHorizontal ? x : i
                const _y = isHorizontal ? i : y
                const currentCell = this.table[_x][_y]
                if (currentCell.ship == ship) {
                    this.table[_x][_y] = cell()
                }
            }
            throw Error('there is a ship in the given coordinates')
        }
    },
    receiveAttack(x, y) {
        if (x < 0 || y < 0 || x >= this.length || y >= this.length) {
            throw RangeError('coordinates outside the board')
        }
        const cell = this.table[x][y]
        if (cell.ship) {
            cell.ship.hit(cell.offset)
            cell.hitted = true
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
