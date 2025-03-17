import { getLinePosition } from "../utils";

import Cell from "./Cell";

const Table = ({
  board,
  onClick,
  isXNext,
  winningLine,
  isStarted,
  setIsStarted,
}: {
  board: (string | null)[],
  onClick: (i: number) => void,
  isXNext: boolean,
  winningLine: number[] | null,
  isStarted: boolean,
  setIsStarted: (isPaused: boolean) => void,
}) => {
  return (
    <div className="relative">
      {!isStarted && (
        <div onClick={() => setIsStarted(true)} className="bg-slate-900/80 grid place-items-center cursor-pointer z-10 border border-slate-600 rounded-sm absolute inset-4">
          <div className="text-center">
            <h1 className="text-white mb-1">Tic Tac Toe</h1>
            <h3>Tap here to start</h3>
          </div>
        </div>
      )}
      <div className="bg-slate-700 grid grid-cols-3 overflow-hidden border border-slate-600 rounded-lg relative">
        {winningLine && (
          <div className={`${getLinePosition(winningLine)} ${isXNext ? "border-red-400" : "border-blue-400"} h-12 z-10 border-4 rounded-full absolute -translate-x-1/2 -translate-y-1/2`} />
        )}
        {board.map((cell, i) => (
          <Cell
            key={i}
            index={i}
            player={cell}
            onClick={() => onClick(i)}
            isXNext={isXNext}
            winningLine={winningLine}
            isStarted={isStarted}
          />
        ))}
      </div>
    </div>
  );
}

export default Table;
