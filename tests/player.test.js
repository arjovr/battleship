import * as players from '../src/player'
import * as gameboard from '../src/gameboard'


it('player attack', () => {
    const n = 10
    const myBoard = gameboard.GameBoard(n)
    const enemyBoard = gameboard.GameBoard(n)
    const player = players.Player(false, myBoard, enemyBoard)
    const spy = jest.spyOn(enemyBoard, 'receiveAttack')

    player.attack(0, 0)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(0, 0)
})

it('player ai attacks random', () => {
    const n = 10
    const myBoard = gameboard.GameBoard(n)
    const enemyBoard = gameboard.GameBoard(n)
    const player = players.Player(true, myBoard, enemyBoard)
    const spy = jest.spyOn(enemyBoard, 'receiveAttack')

    const track = {}
    for (let i = 0; i < 50; i++) {
        player.attack()
        const a = spy.mock.calls
        const x = a[a.length - 1][0]
        const y = a[a.length - 1][1]

        const hash = x * 1000 + y
        if (track[hash]) {
            fail('position already attacked')
        }
        track[hash] = true
    }

})