import * as draw from './draw'
import * as gameboard from './gameboard'
import * as ships from './ships'
import * as random from './random'
import * as players from './player'
import events from 'events'

const emitter = new events.EventEmitter()

const randomShipPlacement = board => (ship) => {
    while (true) {
        try {
            const x = random.int(9)
            const y = random.int(9)
            const isHorizontal = random.int(1) > 0
            board.placeShip(x, y, ship, isHorizontal)
            break
        } catch {

        }
    }
}

const gameloop = function (container1, container2, messageContainer) {
    const myGameBoard = gameboard.GameBoard()
    const aiGameBoard = gameboard.GameBoard()

    const shipSizes = [5, 4, 3, 3, 2]

    const myShips = shipSizes.map(x => ships.Ship(x))
    const aiShips = shipSizes.map(x => ships.Ship(x))


    myShips.forEach(randomShipPlacement(myGameBoard))
    aiShips.forEach(randomShipPlacement(aiGameBoard))


    const myPlayer = players.Player(false, myGameBoard, aiGameBoard)
    myPlayer.turn = true
    const aiPlayer = players.Player(true, aiGameBoard, myGameBoard)

    draw.gameBoard(container1, myGameBoard, aiPlayer, emitter)
    draw.gameBoard(container2, aiGameBoard, myPlayer, emitter)

    emitter.on('played', (player) => {
        player.turn = false
        aiPlayer.attack()
        draw.gameBoard(container1, myGameBoard, aiPlayer, emitter)
        player.turn = true
        if (myGameBoard.allShipSunk()) {
            player.turn = false
            messageContainer.textContent = 'AI wins'
        }
        if (aiGameBoard.allShipSunk()) {
            player.turn = false
            messageContainer.textContent = 'player wins'
        }
    })
}

export default gameloop
