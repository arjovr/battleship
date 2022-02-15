import * as draw from './draw'
import * as gameboard from './gameboard'
import * as ships from './ships'
import * as random from './random'
import * as players from './player'

const randomShipPlacement = board => (ship) => {
    while (true) {
        try {
            const x = random.int(10)
            const y = random.int(10)
            const isHorizontal = random.int(1) > 0
            board.placeShip(x, y, ship, isHorizontal)
            break
        } catch {

        }
    }
}

const gameloop = function (container1, container2) {
    const myGameBoard = gameboard.GameBoard()
    const aiGameBoard = gameboard.GameBoard()

    const shipSizes = [5, 4, 3, 3, 2]

    const myShips = shipSizes.map(x => ships.Ship(x))
    const aiShips = shipSizes.map(x => ships.Ship(x))


    myShips.forEach(randomShipPlacement(myGameBoard))
    aiShips.forEach(randomShipPlacement(aiGameBoard))

    draw.gameBoard(container1, myGameBoard)
    draw.gameBoard(container2, aiGameBoard)

    const myPlayer = players.Player(false, myGameBoard, aiGameBoard)
    const aiPlayer = players.Player(true, aiGameBoard, myGameBoard)
}

export default gameloop
