const _ship = {
    hit(index) {
        if (index < 0 || index >= this.length) {
            throw RangeError('index out of range')
        }
        this.hits[index] = true
    },
    isSunk() {
        return this.hits.every(x => x)
    }
}

const Ship = function (length) {
    const ship = Object.create(_ship)

    if (length <= 0) {
        throw RangeError('length must be positive')
    }

    ship.length = length
    ship.hits = Array(length).fill(false)
    return ship
}

export { Ship }
