// src/components/TraversalPanel.jsx
import React from 'react';

const TraversalPanel = ({
  traversalType,
  setTraversalType,
  traversalResult
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-purple-400">Tree Traversals</h2>
      
      <div className="space-y-4">
        <select
          value={traversalType}
          onChange={(e) => setTraversalType(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-purple-400 focus:outline-none"
        >
          <option value="inorder">In-order</option>
          <option value="preorder">Pre-order</option>
          <option value="postorder">Post-order</option>
          <option value="levelorder">Level-order</option>
        </select>
        
        <div className="p-3 bg-slate-700 rounded-lg">
          <div className="text-sm font-medium text-purple-300 mb-2">Result:</div>
          <div className="text-sm text-slate-300 max-h-32 overflow-y-auto">
            {traversalType === 'levelorder' 
              ? traversalResult.map((level, i) => `L${i}: [${level.join(', ')}]`).join('\n')
              : `[${traversalResult.join(', ')}]`
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraversalPanel;