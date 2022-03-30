import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';  
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
function App() 
{
  return (
    <div className="App">
      <TicTacToe/>
    </div>
  );
}
function TicTacToe()
{
  const[board,setBoard]=useState(Array(9).fill(null))
  const[isXTurn,setIsXturn]=useState(true);
  const handleClick=(index)=>
  {
    if(!winner && !board[index])
    {
      const boardCopy=[...board];
      boardCopy[index]=isXTurn? "X":"O";
     setBoard(boardCopy);
      setIsXturn(!isXTurn);
    }
  }
  const decideWinner=(board)=>
  {
       const lines=[
           [0,1,2],
           [3,4,5],
           [6,7,8],
           [0,3,6],
           [1,4,7],
           [2,5,8],
           [0,4,8],
           [2,4,6],];
    for(let i=0;i<lines.length;i++)
    {
      const [a,b,c]=lines[i];
      if(board[a] && board[a]===board[b] && board[a]===board[c])
       {
         console.log("winner is",board[a]);
          return board[a];
       }
    }
  }
  const winner = decideWinner(board);
  return (
    <div className="game">
    <div className="board">
      {board.map((val,index)=> (<Gamebox val={val} onPlayerClick={()=>handleClick(index)}/>))}
    </div>
    <div className="game-text">{winner ? <Reset winner={winner} setBoard={setBoard} setIsXturn={setIsXturn}/> : "Player: " + (isXTurn ? "X" : "O")}</div>
    </div>
  )

}
function Reset({winner,setBoard,setIsXturn})
{  const { width, height } = useWindowSize()
    return(
    <div>
       <Confetti
      width={width}
      height={height}
    />
      <h1>Winner is {winner}</h1>
      <Button variant="contained" color="success" onClick={()=> 
        { setBoard(Array(9).fill(null))
          setIsXturn(true);
        }}
        >Restart</Button>
      </div>
  )
}
function Gamebox({val,onPlayerClick})
{
  const styles={color:val==="X"? "green":"red"}
  return(<div style={styles} onClick={()=>onPlayerClick()} className="game-box">{val}</div>)
}
export default App;
