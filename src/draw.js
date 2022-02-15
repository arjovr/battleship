const gameBoard = (container, board) => {
    // empty the container
    container.innerHTML = ''
    const table = document.createElement('table')
    let i = 0
    for (const row of board.table) {
        const tr = document.createElement('tr')
        for (const cell of row) {
            const td = document.createElement('td')
            if (cell.ship) {
                td.classList.add('ship')
            }
            tr.append(td)
            i++
        }
        table.append(tr)
    }
    container.append(table)
}

export { gameBoard }
