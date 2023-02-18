import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:8080/game'
})

const start = async () => {
    const {data} = await server.get('/')
    return data.gameId
}

const playerTurn = async (gameId, color, index) => {
    const {data} = await server.post(`/playerturn`, {gameId, color, index})
    return data.result
}

const computerTurn = async gameId => {
    const {data} = await server.post('/compturn', {gameId})
    return data.sequence
}

const streak = async gameId => {
    const {data} = await server.get(`/streak/${gameId}`)
}

const hiscore = async gameId => {
    const {data} = await server.get(`/hiscore/${gameId}`)
}

export default {
    start, playerTurn, computerTurn, streak, hiscore
}