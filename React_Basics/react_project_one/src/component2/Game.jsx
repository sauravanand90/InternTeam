import React, { useState } from 'react'
import "./Game.css"
import Board from './Board'
import Result from './Result';

function Game() {
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [count, setCount] = useState(0);
    const [winner, setWinner] = useState(null);


    return (
        <div className='cont'>
            <h1>Tic-Tac-Toe</h1>
            <p>Player 1:</p>
            <input className='input' value={player1} onChange={(e) => { setPlayer1(e.target.value) }} type="text" placeholder="Enter Player1 Name" />
            <p>Player 2:</p>
            <input className='input' value={player2} onChange={(e) => { setPlayer2(e.target.value) }} type="text" placeholder="Enter Player2 Name" />
            <Board setWinner={setWinner} count={count} setCount={setCount} />
            <Result />
            <button className='btn'>Reset</button>
        </div>
    )
}

export default Game
