import * as random from './random'

const _player = {
    attack(_x, _y) {
        if (!this.isAI) {
            this.enemyBoard.receiveAttack(_x, _y)
            return
        }
        while (true) {
            const x = random.int(this.enemyBoard.length - 1)
            const y = random.int(this.enemyBoard.length - 1)
            if (this.shoots[x][y]) {
                continue
            }
            this.enemyBoard.receiveAttack(x, y)
            this.shoots[x][y] = true
            break
        }
    }
}

const Player = function (isAI, gameboard, enemyBoard) {
    const player = Object.create(_player)
    player.turn = false
    player.isAI = isAI
    player.gameboard = gameboard
    player.enemyBoard = enemyBoard
    player.shoots = []
    for (let i = 0; i < enemyBoard.length; i++) {
        const row = Array(enemyBoard.length).fill(false)
        player.shoots.push(row)
    }
    return player
}

export { Player }
