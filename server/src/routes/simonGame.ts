import { Router, Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Game from '../Game'
import games from '../games'


const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    const gameId: string = uuid()
    const game: Game = new Game(gameId)
    games.push(game)
    res.json({gameId})
})

router.post('/compturn', (req: Request, res: Response) => {
    const {gameId} = req.body
    const game = games.find(g => g.gameId == gameId)
    game?.addToSequence()
    
    res.json({sequence: game?.sequence})
})

router.post('/playerturn', (req: Request, res: Response) => {
    const {gameId, color, index} = req.body

    const game = games.find(g => g.gameId == gameId)
    console.log(color, game?.sequence, index);
    
    const result = color == game?.sequence[index] 
    res.json({result})
})

export default router