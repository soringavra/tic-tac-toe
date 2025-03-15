import { X } from "lucide-react";
import React from "react";

export const DEFAULT_SCORE_GOAL = 10;
export const DEFAULT_TURN_TIMER = 0;

const TURN_TIMER_VALUES = [
  {
    value: 0,
    label: "Off"
  },
  {
    value: 2,
    label: "2s"
  },
  {
    value: 5,
    label: "5s"
  },
  {
    value: 7,
    label: "7s"
  },
  {
    value: 10,
    label: "10s"
  },
];

const SettingsModal = ({
  isOpen,
  onClose,
  winner,
  isDraw,
  scoreGoal,
  setScoreGoal,
  turnTimer,
  setTurnTimer,
}: {
  isOpen: boolean,
  onClose: () => void,
  winner: string | null,
  isDraw: boolean,
  scoreGoal: number,
  setScoreGoal: (scoreGoal: number) => void,
  turnTimer: number,
  setTurnTimer: (turnTimer: number) => void,
}) => {
  if(!isOpen)
    return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    if(value != "") {
      const num = parseInt(value, 10);

      if(num >= 1 && num <= 99) {
        setScoreGoal(num);
      }
    }

    e.target.value = value;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target == e.currentTarget)
      onClose();
  };

  return (
    <div onClick={handleBackdropClick} className="bg-black/50 grid place-items-center z-20 absolute inset-0">
      <div className="bg-slate-800 p-8 rounded-lg relative">
        <h1 className="text-white mb-8">Settings</h1>
        <button onClick={onClose} className="icon-button absolute top-9 right-8 text-gray-500 hover:text-gray-400">
          <X />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <h2>Score Goal</h2>
            <h3 className="max-w-96">Set the number of rounds a player must win to claim victory. (1&mdash;99)</h3>
          </div>
          <input type="tel" onChange={handleChange} onBlur={(e) => {if(!e.target.value.length) e.target.value = DEFAULT_SCORE_GOAL.toString();}} maxLength={2} defaultValue={scoreGoal} className="w-16" />
        </div>
        {(winner || isDraw) && (
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-col gap-0.5">
              <h2>Turn Timer</h2>
              <h3 className="max-w-96">Set the turn time limit in seconds. Timeout switches to next player.</h3>
            </div>
            <div className="flex gap-2">
              {TURN_TIMER_VALUES.map(({ value, label }) => (
                <button key={value} onClick={() => setTurnTimer(value)} className={`${turnTimer == value && "outline-2"} btn-solid text-white bg-slate-900 hover:bg-slate-800 border-slate-600 hover:border-slate-500 outline-offset-2 outline-blue-400`}>{label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
