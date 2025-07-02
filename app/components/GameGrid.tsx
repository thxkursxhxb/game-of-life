'use client';

interface GameGridProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  isRunning: boolean;
  numRows: number;
  numCols: number;
}

const GameGrid = ({ grid, setGrid, isRunning, numRows, numCols }: GameGridProps) => {
  const toggleCellState = (row: number, col: number) => {
    if (isRunning) return;
    const newGrid = grid.map((r, i) =>
      r.map((c, j) => {
        if (i === row && j === col) {
          return c === 1 ? 0 : 1;
        }
        return c;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div
      className="inline-grid border border-slate-700"
      style={{
        gridTemplateColumns: `repeat(${numCols}, 16px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((_, k) => (
          <div
            key={`${i}-${k}`}
            onClick={() => toggleCellState(i, k)}
            className={`h-4 w-4 border-r border-b border-slate-700 transition-colors duration-300 ${
              grid[i][k] ? 
              'bg-cyan-400 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]' 
              : 'bg-slate-800/50'
            } ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-slate-600'}`}
          />
        ))
      )}
    </div>
  );
};

export default GameGrid;