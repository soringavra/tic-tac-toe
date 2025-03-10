const checkWinner = (cells: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let line of lines) {
    const [a, b, c] = line;

    if(cells[a] && cells[a] == cells[b] && cells[a] == cells[c])
      return { winner: cells[a] as 'X' | 'O', line };
  }

  return null;
};

const checkDraw = (cells: (string | null)[]) => {
  return cells.every((cell) => cell != null);
};

const getLinePosition = (winningLine: number[]) => {
  const lines: Record<string, string> = {
    "0,1,2": "w-[90%] top-[16.66%] left-1/2",
    "3,4,5": "w-[90%] top-1/2 left-1/2",
    "6,7,8": "w-[90%] top-[83.33%] left-1/2",
    "0,3,6": "w-[90%] top-1/2 left-[16.66%] rotate-z-90",
    "1,4,7": "w-[90%] top-1/2 left-1/2 rotate-z-90",
    "2,5,8": "w-[90%] top-1/2 left-[83.33%] rotate-z-90",
    "0,4,8": "w-[120%] top-1/2 left-1/2 rotate-z-45",
    "2,4,6": "w-[120%] top-1/2 left-1/2 -rotate-z-45",
  };

  return lines[winningLine.sort().join(",")] || "";
};

const getBorder = (i: number) => {
  if(i == 0 || i == 1 || i == 3 || i == 4)
    return "border-r border-b";
  if(i == 2 || i == 5)
    return "border-b";
  if(i == 6 || i == 7)
    return "border-r";
};

export { checkWinner, checkDraw, getLinePosition, getBorder };
