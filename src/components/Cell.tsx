import { getBorder } from "../utils";

const Cell = ({
  index,
  player,
  onClick,
  isXNext,
  winningLine,
}: {
  index: number,
  player: string | null,
  onClick: () => void,
  isXNext: boolean,
  winningLine: number[] | null,
}) => {
  return (
    <div onClick={onClick} className={`${getBorder(index)} ${winningLine?.includes(index) && (!isXNext ? "before:bg-blue-950" : "before:bg-red-950")} cursor-pointer aspect-square border-slate-600 relative group before:content-[''] before:rounded-lg before:absolute before:inset-5`}>
      {player != null && <h1 className={`${player == "X" ? "text-blue-400" : "text-red-400"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>{player}</h1>}
      {player == null && !winningLine && <h1 className={`${isXNext ? "text-blue-400" : "text-red-400"} opacity-0 group-hover:opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>{isXNext ? "X" : "O"}</h1>}
    </div>
  );
}

export default Cell;
