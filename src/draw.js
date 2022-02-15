const gameBoard = (container, board, player, emitter) => {
    // empty the container
    container.innerHTML = ''
    const table = document.createElement('table')
    let x = 0
    for (const row of board.table) {
        let y = 0
        const tr = document.createElement('tr')
        for (const cell of row) {
            const td = document.createElement('td')
            if (cell.ship && player.isAI) {
                td.classList.add('ship')
            }
            if (cell.missedShot) {
                td.classList.add('missed-shot')
            }
            if (cell.hitted) {
                td.classList.add('ship-hitted')
            }
            td.dataset.x = x
            td.dataset.y = y
            tr.append(td)
            if (!player.isAI) {
                td.addEventListener('click', (e) => {
                    if (!player.turn) return
                    if (e.target.dataset.hitted == 'true') return
                    e.target.dataset.hitted = true
                    player.attack(e.target.dataset.x, e.target.dataset.y)
                    emitter.emit('played', player)
                    if (cell.missedShot) {
                        td.classList.add('missed-shot')
                    }
                    if (cell.hitted) {
                        td.classList.add('ship-hitted')
                    }

                })
            }
            y++
        }
        table.append(tr)
        x++
    }
    container.append(table)
}

export { gameBoard }
