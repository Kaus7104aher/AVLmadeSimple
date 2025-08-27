// src/components/TreeCanvas.jsx
import React from 'react';
import TreeNode from './TreeNode';
import { Info } from 'lucide-react';

const TreeCanvas = ({ treeData, tree }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-emerald-400">Tree Visualization</h2>
      
      <div className="bg-white rounded-lg p-4 min-h-[600px] overflow-auto">
        <svg width="100%" height="700" viewBox="0 0 800 700" className="w-full h-auto">
          {treeData && <TreeNode node={treeData} tree={tree} />}
          {!treeData && (
            <text x="400" y="350" textAnchor="middle" className="fill-gray-500 text-lg">
              Tree is empty. Insert some values to get started!
            </text>
          )}
        </svg>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
          Balanced Node
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          Unbalanced Node
        </div>
        <div className="flex items-center gap-2">
          <Info size={16} />
          h: height, b: balance factor
        </div>
      </div>
    </div>
  );
};

export default TreeCanvas;