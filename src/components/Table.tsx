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
    <div className="bg-slate-700 grid grid-cols-3 overflow-hidden border border-slate-600 rounded-lg relative">
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
