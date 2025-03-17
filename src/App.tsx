import { useState, useEffect } from "react";
import { useReward } from "react-rewards";
import { checkWinner, checkDraw } from "./utils";
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
  const [isStarted, setIsStarted] = useState(false);
  const [scoreGoal, setScoreGoal] = useState(DEFAULT_SCORE_GOAL);
  const [turnTimer, setTurnTimer] = useState(DEFAULT_TURN_TIMER);
  const [turnTimeLeft, setTurnTimeLeft] = useState(DEFAULT_TURN_TIMER);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { reward } = useReward("confetti", "confetti");
  
  const handleClick = (i: number) => {
    if(board[i] || winningLine || !isStarted)
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
    if(winner || isDraw || !isStarted || turnTimer == 0)
      return;

    setTurnTimeLeft(turnTimer);

    const interval = setInterval(() => {
      setTurnTimeLeft((prev) => {
        console.log(prev, turnTimer);

        if(prev <= 1)
          setIsXNext(!isXNext);

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [turnTimer, isXNext, winner, isDraw, isStarted]);

  useEffect(() => {
    document.documentElement.style.setProperty("--timer-duration", `${turnTimer}s`);
  }, [turnTimer]);

  return (
    <>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} winner={winner} isDraw={isDraw} isStarted={isStarted} scoreGoal={scoreGoal} setScoreGoal={setScoreGoal} turnTimer={turnTimer} setTurnTimer={setTurnTimer} />
      <div className="max-w-[96rem] h-full grid place-items-center m-auto">
        <div className="grid gap-2">
          <p className={`${(winningLine || isDraw || !isStarted) ? "visible" : "invisible"} text-white font-semibold text-center mb-2`}>{!isStarted ? "Choose who starts first" : isDraw ? "It's a draw!" : (isXNext ? "O won" : "X won")}{!isDraw && isStarted && ((score.X == scoreGoal || score.O == scoreGoal) ? " the game!" : " the round!")}</p>
          <Scoreboard score={score} isXNext={isXNext} setIsXNext={setIsXNext} isDraw={isDraw} isStarted={isStarted} winner={winner} scoreGoal={scoreGoal} turnTimer={turnTimer} turnTimeLeft={turnTimeLeft} />
          <Table board={board} onClick={handleClick} isXNext={isXNext} winningLine={winningLine} isStarted={isStarted} setIsStarted={setIsStarted} />

          <div className={`${(winningLine || isDraw || !isStarted) ? "visible" : "invisible"} ${!isStarted ? "flex-col-reverse" : "flex-col"} flex flex-col gap-2`}>
            {/** PLAY AGAIn */}
            <button onClick={resetGame} className={`${winningLine || isDraw ? "visible" : "invisible"} btn-solid text-white bg-blue-600 hover:bg-blue-500 border-blue-500 hover:border-blue-500`}>Play Again</button>
            <div className="flex gap-2">
              <button onClick={() => setIsSettingsOpen(true)} className="btn-solid text-white bg-slate-700 hover:bg-slate-600 flex-2 border-slate-600 hover:border-slate-500">Settings</button>
              <button onClick={() => { resetGame(); setScore({ X: 0, O: 0 }); setIsStarted(false); }} className={`${winningLine || isDraw ? "visible" : "hidden"} btn-solid text-white bg-slate-700 hover:bg-slate-600 flex-1 border-slate-600 hover:border-slate-500`}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
