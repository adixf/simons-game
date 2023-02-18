import './App.css'
import api from './api/gameApi'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import fail from './utils/sounds/fail.mp3'
import timeout from './utils/timeout'
import { Button } from '@mui/material'
import gling from './utils/sounds/gling.mp3'
import ColorButton from './components/ColorButton'

let gameId = ''
let sequenceLength = 0
let playerSequence = []

function App() {

  const [playGling] = useSound(gling)
  const [playFail] = useSound(fail)

  
  const colors = ['yellow', 'blue', 'red', 'green']


  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [nowFlashing, setNowFlashing] = useState('')
  const [playerTurn, setPlayerTurn] = useState(false)
  const [highScore, setHighScore] = useState(0)

  useEffect(()=> {
    const high = highScore >= score ? highScore : score
    setHighScore(highScore => high)
  }, [score])

  const startHandle = async () => {
    setIsPlaying(true)
    gameId = await api.start()
    await computerTurn()
  }

  const computerTurn = async () => {
    const sequence = await api.computerTurn(gameId)
    sequenceLength = sequence.length
    await displaySequence(sequence)
    setPlayerTurn(true)
  }

  const displaySequence = async sequence => {
    for(let i=0; i<sequenceLength; i++) {
      await choose(sequence[i])
    }
  }

  const choose = async (color, success=true) => {
    await timeout(400)
      setNowFlashing(color)
      success ? playGling() : playFail()
      await timeout(400)
      setNowFlashing('')
  }

  const onClick = async (color) => {
    setPlayerTurn(false)
    const result = await api.playerTurn(gameId, color, playerSequence.length)
    await choose(color, result)

    if(!result) {
      setIsPlaying(false)
      setScore(0)
      playerSequence = []
    }

    else {
      setPlayerTurn(true)
      playerSequence.push(color)
    }

    if(playerSequence.length >= sequenceLength) {        

      setScore(score => score + 1)

      playerSequence = []

      setPlayerTurn(false)

      await computerTurn()
      
    }
    
  }


  return (
    <div className='wrapper'>
      <div className='buttonWrapper'>
        {
          colors.map((color, index) => (
            <ColorButton 
              enabled={playerTurn} color={color} flash={nowFlashing == color} key={index} 
              onClick={() => onClick(color)}
            />)
          )
        }
      </div>
      <div className='startWrapper'>
      { !isPlaying ?
        <Button
          variant='contained' 
          onClick={startHandle}
          className='startButton'
        >
          Start
        </Button> 
      :
      <div className='score'>
        <p className='scoreText'>{score}</p>
      </div>
      }
      </div>
      
    <div className='highscore'>highscore: {highScore}</div>
    </div>
  )
}

export default App
