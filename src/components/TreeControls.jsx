// src/components/TreeControls.jsx
import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

const TreeControls = ({
  inputValue,
  setInputValue,
  onInsert,
  onDelete,
  onBatchInsert,
  onClear,
  animationSpeed,
  setAnimationSpeed,
  isAnimating
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onInsert();
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-emerald-400">Tree Operations</h2>
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value(s) - comma separated for batch"
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 border border-slate-600 focus:border-emerald-400 focus:outline-none"
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onInsert}
            disabled={isAnimating}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insert
          </button>
          <button
            onClick={onDelete}
            disabled={isAnimating}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
        
        <button
          onClick={onBatchInsert}
          disabled={isAnimating}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Play size={16} />
          Batch Insert
        </button>

        <button
          onClick={onClear}
          className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Clear Tree
        </button>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Animation Speed (ms)</label>
        <input
          type="range"
          min="1"
          max="500"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center text-sm text-slate-400 mt-1">{animationSpeed}ms</div>
      </div>
    </div>
  );
};

export default TreeControls;