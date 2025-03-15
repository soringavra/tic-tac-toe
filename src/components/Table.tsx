import { getLinePosition } from "../utils";

import Cell from "./Cell";

const Table = ({
  board,
  onClick,
  isXNext,
  winningLine,
}: {
  board: (string | null)[],
  onClick: (i: number) => void,
  isXNext: boolean,
  winningLine: number[] | null,
}) => {
  return (
    <div className="bg-slate-700 grid grid-cols-3 border border-slate-600 rounded-lg relative">
      {winningLine && <div className={`${getLinePosition(winningLine)} ${isXNext ? "bg-red-500/50 outline-red-500" : "bg-blue-500/50 outline-blue-500"} h-12 z-10 outline rounded-full absolute -translate-x-1/2 -translate-y-1/2`} />}
      {board.map((cell, i) => (
        <Cell
          key={i}
          index={i}
          player={cell}
          onClick={() => onClick(i)}
          isXNext={isXNext}
          winningLine={winningLine}
        />
      ))}
    </div>
  )
}

export default Table;
