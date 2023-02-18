class Game {
    gameId: string
    score: number
    sequence: string[]

    constructor(gameId: string) {
        this.gameId = gameId
        this.score = 0
        this.sequence = []
    }

    addToSequence(): void {
        const options = ['red', 'blue', 'green', 'yellow']
        const color: string = options[Math.floor(Math.random()*options.length)]
        this.sequence.push(color)
    }

}

export default Game