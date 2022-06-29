import React, { useState } from "react";


const TicTacToe = () => {
  const [turn, setTurn] = useState("O");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner,setWinner] = useState();


  const checkForWinner = (squares)=>{

    let combos = {
      across :[
        [0,1,2],
        [3,4,5],
        [6,7,8]
      ],
      down: [
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ],
      diagonal :[
        [0,4,8],
        [2,4,6]
      ]
    }

    
    for(let combo in combos){
      combos[combo].forEach((pattern)=>{
         
        if(squares[pattern[0]]===''||
        squares[pattern[1]]===''||
        squares[pattern[2]]===''
        ){
          //do nothing
        }
        else if(squares[pattern[0]]===squares[pattern[1]] &&
          squares[pattern[1]]===squares[pattern[2]]){
            setWinner(squares[pattern[0]]);
        }

        })
    }

  }


  const clickHandler = (num) => {
    let squares = [...cells];

    if (squares[num] !== "") {
      return;
    }

    if(winner != null){
      return
    }

    if (turn === "O") {
      squares[num] = "O";
      setTurn("X");
    } else {
      squares[num] = "X";
      setTurn("O");
    }

    const voidSquares = squares.filter(square=>{
      return square==='';
    }).length;
    if(voidSquares<=0){
      setWinner('Draw')
    }
  
    checkForWinner(squares);
    setCells(squares);
  };



  const restartHandler =()=>{
    setWinner(null);
    setCells(Array(9).fill(''));
    setTurn('O');
  }


  const Cell = ({ num,clsName }) => {
    return (
      <div
        className={`cell ${clsName}`}
        onClick={() => {
          clickHandler(num);
        }}
      >
        {cells[num]}
      </div>
    );
  };

  return (
    <>
      <p className="sub-title" >Turn : <span>{turn}</span></p>
      <div className="container">
        <div className="tictac">
          <div className="row">
            <Cell num={0} clsName="bd-right-bottom"/>
            <Cell num={1} clsName="bd-right-bottom"/>
            <Cell num={2} clsName="bd-bottom"/>
          </div>
          <div className="row">
            <Cell num={3} clsName="bd-right-bottom"/>
            <Cell num={4} clsName="bd-right-bottom"/>
            <Cell num={5} clsName="bd-bottom"/>
          </div>
          <div className="row">
            <Cell num={6} clsName="bd-right"/>
            <Cell num={7} clsName="bd-right"/>
            <Cell num={8} />
          </div>
        </div>
      </div>
      {winner && <>
      <p className="sub-title" >Winner : <span>{winner}</span></p>
      <button onClick={restartHandler} className="btn">Play again</button>
      </>
      }
    
</>
  );
};

export default TicTacToe;
