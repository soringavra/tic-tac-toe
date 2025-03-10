import { useState } from "react";
import { checkWinner, checkDraw } from "./utils";

import Scoreboard from "./components/Scoreboard";
import Table from "./components/Table";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  
  const handleClick = (i: number) => {
    if(board[i] || winningLine)
      return;

    const newBoard = [...board];

    newBoard[i] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);

    if(result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScore((prevScore) => ({
        ...prevScore,
        [result.winner]: prevScore[result.winner] + 1,
      }));
    } else {
      if(checkDraw(newBoard))
        setIsDraw(true);
    }
  };

  const resetGame = () => {
    if(winner == "X")
      setIsXNext(false);
    else
      setIsXNext(true);

    if(isDraw)
      setIsXNext(isXNext);
    
    setWinner(null);
    setBoard(Array(9).fill(null));
    setWinningLine(null);
    setIsDraw(false);
  };

  return (
    <div className="max-w-[96rem] h-full grid place-items-center m-auto">
      <div className="flex flex-col gap-3">
        <p className={`${(winningLine || isDraw) ? "visible" : "invisible"} text-white font-semibold text-center mb-2`}>{isDraw ? "It's a draw!" : (isXNext ? "O won!" : "X won!")}</p>
        <Scoreboard score={score} isXNext={isXNext} isDraw={isDraw} winner={winner} />
        <Table board={board} onClick={handleClick} isXNext={isXNext} winningLine={winningLine} />
        <div className={`${(winningLine || isDraw) ? "visible" : "invisible"} flex gap-3`}>
          <button onClick={resetGame} className="text-white bg-blue-600 hover:bg-blue-500 flex-2 border-blue-500">Play Again</button>
          <button onClick={() => { resetGame(); setScore({ X: 0, O: 0 }); }} className="text-white bg-slate-700 hover:bg-slate-600 flex-1 border-slate-600">Reset</button>
        </div>
      </div>
      <small className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2">Made with ❤️ by Sorin Gavra {/**&mdash; <a target="_blank" href="/">Source</a> */}</small>
    </div>
  )
}

export default App;
