import React, { useState } from 'react'
import "./Game.css"
function Board({setWinner, count, setCount}) {
    const [turn, setTurn] = useState(true);
    const[b1, setB1] = useState("");
    const[b2, setB2] = useState("");
    const[b3, setB3] = useState("");
    const[b4, setB4] = useState("");
    const[b5, setB5] = useState("");
    const[b6, setB6] = useState("");
    const[b7, setB7] = useState("");
    const[b8, setB8] = useState("");
    const[b9, setB9] = useState("");

    const mark = (value, setB) => {
        if(value!=="") return; 
        if(turn){
            setB("X");
        }else{
            setB("O");
        }
        setTurn(!turn)
        setCount(count=>count+1);
        console.log(count);
    }

    const checkWinner = (board) => {
        const winningPatterns = [["b1","b2","b3"],["b4","b5","b6"],["b7","b8","b9"],
        ["b1","b4","b7"],["b2","b5","b8"],["b1","b5","b9"],["b3","b5","b7"]];

        for(let patterns of winningPatterns){
            const[a, b, c] = patterns;
            if(board[a] && board[b] && board[c]){
                if(board[a]===board[b] && board[b]===board[c]){
                    setWinner(board[a]);
                    return;
                }
            }
        }
        if(count===8) setWinner("Draw");
    }

    return (
        <div className='game'>
            <button className="box" onClick={() => { mark(b1,setB1) }}>{b1}</button>
            <button className="box" onClick={() => { mark(b2,setB2) }}>{b2}</button>
            <button className="box" onClick={() => { mark(b3,setB3) }}>{b3}</button>
            <button className="box" onClick={() => { mark(b4,setB4) }}>{b4}</button>
            <button className="box" onClick={() => { mark(b5,setB5) }}>{b5}</button>
            <button className="box" onClick={() => { mark(b6,setB6) }}>{b6}</button>
            <button className="box" onClick={() => { mark(b7,setB7) }}>{b7}</button>
            <button className="box" onClick={() => { mark(b8,setB8) }}>{b8}</button>
            <button className="box" onClick={() => { mark(b9,setB9) }}>{b9}</button>
        </div>
    )
}

export default Board
