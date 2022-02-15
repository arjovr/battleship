function int(maxNumber) {
    const max = Math.floor(maxNumber)
    return Math.floor(Math.random() * (max + 1))
}

export { int }
