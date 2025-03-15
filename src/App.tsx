import { useState, useEffect, use } from "react";
import { checkWinner, checkDraw } from "./utils";
import { useReward } from "react-rewards";
import { DEFAULT_SCORE_GOAL, DEFAULT_TURN_TIMER } from "./components/SettingsModal";

import Scoreboard from "./components/Scoreboard";
import Table from "./components/Table";
import SettingsModal from "./components/SettingsModal";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scoreGoal, setScoreGoal] = useState(DEFAULT_SCORE_GOAL);
  const [turnTimer, setTurnTimer] = useState(DEFAULT_TURN_TIMER);
  const [turnTimeLeft, setTurnTimeLeft] = useState(DEFAULT_TURN_TIMER);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  useEffect(() => {
    if(winner || isDraw || turnTimer == 0)
      return;

    setTurnTimeLeft(turnTimer);

    const interval = setInterval(() => {
      setTurnTimeLeft((prev) => {
        if(prev <= 1)
          setIsXNext(!isXNext);

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [turnTimer, isXNext, winner, isDraw]);

  useEffect(() => {
    document.documentElement.style.setProperty("--timer-duration", `${turnTimer}s`);
  }, [turnTimer]);

  return (
    <>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} winner={winner} isDraw={isDraw} scoreGoal={scoreGoal} setScoreGoal={setScoreGoal} turnTimer={turnTimer} setTurnTimer={setTurnTimer} />
      <div className="max-w-[96rem] h-full grid place-items-center m-auto">
        <div className="grid gap-3">
          <p className={`${(winningLine || isDraw) ? "visible" : "invisible"} text-white font-semibold text-center mb-2`}>{isDraw ? "It's a draw!" : (isXNext ? "O won" : "X won")}{!isDraw && ((score.X == scoreGoal || score.O == scoreGoal) ? " the game!" : " the round!")}</p>
          <Scoreboard score={score} isXNext={isXNext} isDraw={isDraw} winner={winner} scoreGoal={scoreGoal} turnTimer={turnTimer} turnTimeLeft={turnTimeLeft} />
          <Table board={board} onClick={handleClick} isXNext={isXNext} winningLine={winningLine} />
          <button onClick={() => setIsSettingsOpen(true)} className="btn-solid text-white bg-slate-700 hover:bg-slate-600 border-slate-600">Settings</button>
          <div className={`${(winningLine || isDraw) ? "visible" : "invisible"} flex gap-3`}>
            {(score.X != scoreGoal && score.O != scoreGoal) && (
              <button onClick={resetGame} className="btn-solid text-white bg-blue-600 hover:bg-blue-500 flex-2 border-blue-500">Play Again</button>
            )}
            <button onClick={() => { resetGame(); setScore({ X: 0, O: 0 }); }} className="btn-solid text-white bg-slate-700 hover:bg-slate-600 flex-1 border-slate-600">Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
