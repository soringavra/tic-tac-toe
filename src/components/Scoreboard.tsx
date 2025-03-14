const Scoreboard = ({
  score,
  isXNext,
  isDraw,
  winner,
  scoreGoal,
}: {
  score: { X: number, O: number },
  isXNext: boolean,
  isDraw: boolean,
  winner: string | null,
  scoreGoal: number,
}) => {
  return (
    <div className="text-white font-xo tracking-widest flex gap-3">
      <div id="confetti" className="z-10 absolute left-1/2 top-1/2" />
      <div className={`${!winner && !isDraw ? (isXNext ? "outline-2 outline-blue-400" : "outline-0") : winner == "X" && !isDraw ? "outline-2 outline-green-400" : isDraw && "outline-0"} ${score.O == scoreGoal && "opacity-50"} bg-slate-700 flex p-4 border border-slate-600 outline-offset-2 rounded-lg`}>
        <h1 className="text-blue-400 text-3xl">X</h1>
        <h1 className="w-16 text-3xl text-end">{score.X.toString().padStart(2, "0")}</h1>
      </div>
      <div className={`${!winner && !isDraw ? (!isXNext ? "outline-2 outline-red-400" : "outline-0") : winner == "O" && !isDraw ? "outline-2 outline-green-400" : isDraw && "outline-0"} ${score.X == scoreGoal && "opacity-50"} bg-slate-700 flex p-4 border border-slate-600 outline-offset-2 rounded-lg`}>
        <h1 className="w-16 text-3xl">{score.O.toString().padStart(2, "0")}</h1>
        <h1 className="text-red-400 text-3xl">O</h1>
      </div>
    </div>
  );
}

export default Scoreboard;
