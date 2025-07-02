'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import GameGrid from './components/GameGrid';
import FloatingControls from './components/FloatingControls';
import ExplanationModal from './components/ExplanationModal';
import { produce } from 'immer';
import { Play, Pause, FastForward, Eraser, Info, BrainCircuit } from 'lucide-react';

const createEmptyGrid = (rows: number, cols: number) => {
  return Array(rows).fill(0).map(() => Array(cols).fill(0));
};

export default function Home() {
  const [gridSize, setGridSize] = useState(50);
  const [numRows, setNumRows] = useState(20);
  const [numCols, setNumCols] = useState(20);
  const [grid, setGrid] = useState(() => createEmptyGrid(20, 20));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [isMounted, setIsMounted] = useState(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  const mainAreaRef = useRef<HTMLDivElement>(null);

  const runNextStep = useCallback(() => {
    setGrid((currentGrid) => produce(currentGrid, (draftGrid) => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0;
          const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
          directions.forEach(([di, dj]) => {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols) {
              neighbors += currentGrid[ni][nj] ?? 0;
            }
          });
          if (currentGrid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
            draftGrid[i][j] = 0;
          } else if (currentGrid[i][j] === 0 && neighbors === 3) {
            draftGrid[i][j] = 1;
          }
        }
      }
    }));
  }, [numRows, numCols]);

  useEffect(() => { setIsMounted(true) }, []);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => runNextStep(), speed);
    return () => clearInterval(timer);
  }, [isRunning, speed, runNextStep]);

  useEffect(() => {
    if (!isMounted) return;
    const calculateDimensions = () => {
      if (!mainAreaRef.current) return;
      const mainAreaWidth = mainAreaRef.current.offsetWidth;
      const cellSize = 16;
      const maxCols = Math.floor(mainAreaWidth / (cellSize + 1));
      const currentCols = Math.floor(maxCols * (gridSize / 100));
      const currentRows = Math.floor(currentCols * 0.6);
      setIsRunning(false);
      setNumRows(currentRows);
      setNumCols(currentCols);
      setGrid(createEmptyGrid(currentRows, currentCols));
    };
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [gridSize, isMounted]);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setGrid(createEmptyGrid(numRows, numCols));
  }, [numRows, numCols]);

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleNext = () => { if (!isRunning) runNextStep() };

  return (
    <div className="relative flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900 -z-10">
        <div className="absolute bottom-0 left-[-20%] right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>

      <ExplanationModal 
        isVisible={isExplanationVisible}
        onClose={() => setIsExplanationVisible(false)}
      />

      <header className="py-4 text-center border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-4">
          <BrainCircuit size={32} className="text-cyan-400" />
          <h1 className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent text-3xl font-black tracking-wider bg-[length:200%_auto] animate-background-pan drop-shadow-[0_0_5px_rgba(107,224,255,0.5)]">
            CONWAY'S GAME OF LIFE
          </h1>
        </div>
      </header>
      
      <main ref={mainAreaRef} className="flex-grow flex items-center justify-center p-4 relative">
        <GameGrid 
          grid={grid} 
          setGrid={(newGrid: number[][]) => setGrid(newGrid)}
          isRunning={isRunning} 
          numRows={numRows}
          numCols={numCols}
        />
        <FloatingControls 
          speed={speed} 
          setSpeed={setSpeed} 
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
      </main>
      
      <footer className="bg-slate-900/50 backdrop-blur-sm p-3 flex justify-center items-center gap-3 border-t border-slate-700/50">
        <button 
          onClick={() => setIsExplanationVisible(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-md font-semibold hover:bg-slate-600 transition"
        >
          <Info size={18} /> INFO
        </button>
        <button 
          onClick={handleStartStop}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-lg font-bold transition ${
            isRunning 
            ? 'bg-yellow-500/80 text-white hover:bg-yellow-600' 
            : 'bg-green-500/80 text-white hover:bg-green-600'
          }`}
        >
          {isRunning ? <><Pause size={20}/>PAUSE</> : <><Play size={20}/>START</>}
        </button>
        <button 
          onClick={handleNext}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {/* THE FIX: Changed <Next /> to <FastForward /> */}
          <FastForward size={18} /> NEXT
        </button>
        <button 
          onClick={resetSimulation}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
        >
          <Eraser size={18} /> CLEAR
        </button>
      </footer>
    </div>
  );
}