import { useState } from "react";
import { checkWinner, checkDraw } from "./utils";
import { useReward } from "react-rewards";

import Scoreboard from "./components/Scoreboard";
import Table from "./components/Table";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scoreGoal] = useState(10);
  // const [timer, setTimer] = useState(0);

  const { reward } = useReward("confetti", "confetti");
  
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
      setScore((prevScore) => {
        const newScore = {
          ...prevScore,
          [result.winner]: prevScore[result.winner] + 1,
        }

        if(newScore.X == scoreGoal || newScore.O == scoreGoal)
          reward();

        return newScore;
      });
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
      <div className="grid gap-3">
        <p className={`${(winningLine || isDraw) ? "visible" : "invisible"} text-white font-semibold text-center mb-2`}>{isDraw ? "It's a draw!" : (isXNext ? "O won" : "X won")}{!isDraw && ((score.X == scoreGoal || score.O == scoreGoal) ? " the game!" : " the round!")}</p>
        <Scoreboard score={score} isXNext={isXNext} isDraw={isDraw} winner={winner} scoreGoal={scoreGoal} />
        <Table board={board} onClick={handleClick} isXNext={isXNext} winningLine={winningLine} />
        <div className={`${(winningLine || isDraw) ? "visible" : "invisible"} flex gap-3`}>
          {(score.X != scoreGoal && score.O != scoreGoal) && (
            <button onClick={resetGame} className="text-white bg-blue-600 hover:bg-blue-500 flex-2 border-blue-500">Play Again</button>
          )}
          <button onClick={() => { resetGame(); setScore({ X: 0, O: 0 }); }} className="text-white bg-slate-700 hover:bg-slate-600 flex-1 border-slate-600">Reset</button>
        </div>
        <button className={`${(winningLine || isDraw) ? "visible" : "invisible"} text-white bg-slate-700 hover:bg-slate-600 border-slate-600`}>Settings</button>
      </div>
    </div>
  )
}

export default App;
