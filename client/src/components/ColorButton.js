import '../App.css'
import React from 'react'
import { Button, Paper } from '@mui/material'

function ColorButton({color, onClick, flash, enabled}) {
    
    return (
        <Paper   
            component={Button}
            disabled={!enabled}
            onClick={onClick}
            className={`colorButton ${color} ${flash ? 'flash' : ''}`}
        ></Paper>
    )  
}

export default ColorButton