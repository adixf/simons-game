import express, { Application, Request, Response } from 'express'
const app: Application = express()
import gameRouter from './routes/simonGame' 

const PORT = 8080 

app.use(express.json())

app.use((req: Request, res: Response, next: any) => {
    console.log(`Received request ${req.method} ${req.url}`)
    next()
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/game', gameRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})