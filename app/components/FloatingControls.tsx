'use client';

interface FloatingControlsProps {
  speed: number;
  setSpeed: (speed: number) => void;
  gridSize: number;
  setGridSize: (size: number) => void;
}

const FloatingControls = ({
  speed,
  setSpeed,
  gridSize,
  setGridSize,
}: FloatingControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl w-64 space-y-4 border border-slate-700">
      <div className="flex flex-col">
        <label htmlFor="speed" className="text-sm text-slate-400 mb-1">
          Speed
        </label>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Slower</span>
          <input
            id="speed"
            type="range"
            min="50"
            max="1000"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            style={{ direction: 'rtl' }}
          />
          <span className="text-slate-500">Faster</span>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="gridSize" className="text-sm text-slate-400 mb-1">
          Grid Size
        </label>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Small</span>
          <input
            id="gridSize"
            type="range"
            min="10"
            max="100"
            step="1"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-slate-500">Large</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingControls;