// src/components/OperationsLog.jsx
import React from 'react';

const OperationsLog = ({ operations }) => {
  if (operations.length === 0) return null;

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl mt-6">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400">Operations Log</h2>
      <div className="bg-slate-900 rounded-lg p-4 max-h-48 overflow-y-auto">
        <div className="space-y-1">
          {operations.slice(-10).map((op, index) => (
            <div key={index} className="text-sm text-slate-300">
              {operations.length - 10 + index + 1}. {op}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperationsLog;