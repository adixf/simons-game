import { Router, Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import gameCache from '../cachce'
import Game from '../types/Game'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    const gameId: string = uuid()
    const game: Game = new Game(gameId)

    gameCache.set(gameId, game)

    res.json({gameId})
})

router.post('/compturn', (req: Request, res: Response) => {
    const {gameId} = req.body 
    const game = gameCache.get(gameId)

    game?.addToSequence() 

    gameCache.set(gameId, game)

    res.json({sequence: game?.sequence})
})

router.post('/playerturn', (req: Request, res: Response) => {
    const {gameId, color, index} = req.body
    const game = gameCache.get(gameId)

    const result = color == game?.sequence[index] 

    res.json({result})
})

export default router