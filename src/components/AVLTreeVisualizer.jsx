// src/components/AVLTreeVisualizer.jsx
import React, { useState } from 'react';
import { Download } from 'lucide-react';

import TreeControls from './TreeControls';
import SearchPanel from './SearchPanel';
import TraversalPanel from './TraversalPanel';
import TreeCanvas from './TreeCanvas';
import OperationsLog from './OperationsLog';
import { useAVLTree } from '../hooks/useAVLTree';

const AVLTreeVisualizer = () => {
  const {
    tree,
    treeData,
    operations,
    traversalResult,
    traversalType,
    setTraversalType,
    insertValue,
    deleteValue,
    searchValue,
    clearTree,
    exportTreeData
  } = useAVLTree();

  // Local state for inputs and animations
  const [inputValue, setInputValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handlers
  const handleInsert = () => {
    if (insertValue(inputValue)) {
      setInputValue('');
    }
  };

  const handleDelete = () => {
    if (deleteValue(inputValue)) {
      setInputValue('');
    }
  };

  const handleSearch = () => {
    const result = searchValue(searchInput);
    setSearchResult(result);
  };

  const handleBatchInsert = () => {
    const values = inputValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    setIsAnimating(true);
    
    let i = 0;
    const insertNext = () => {
      if (i < values.length) {
        insertValue(values[i]);
        i++;
        setTimeout(insertNext, animationSpeed);
      } else {
        setIsAnimating(false);
      }
    };
    
    insertNext();
    setInputValue('');
  };

  const handleExport = () => {
    const data = exportTreeData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avl-tree-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            AVL Tree Visualizer
          </h1>
          <p className="text-slate-300">Interactive visualization of self-balancing binary search tree</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <TreeControls
              inputValue={inputValue}
              setInputValue={setInputValue}
              onInsert={handleInsert}
              onDelete={handleDelete}
              onBatchInsert={handleBatchInsert}
              onClear={clearTree}
              animationSpeed={animationSpeed}
              setAnimationSpeed={setAnimationSpeed}
              isAnimating={isAnimating}
            />

            <SearchPanel
              searchValue={searchInput}
              setSearchValue={setSearchInput}
              onSearch={handleSearch}
              searchResult={searchResult}
            />

            <TraversalPanel
              traversalType={traversalType}
              setTraversalType={setTraversalType}
              traversalResult={traversalResult}
            />

            {/* Export Button */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-orange-400">Export</h2>
              <button
                onClick={handleExport}
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Export Data
              </button>
            </div>
          </div>

          {/* Right Side - Visualization */}
          <div className="lg:col-span-2">
            <TreeCanvas treeData={treeData} tree={tree} />
            <OperationsLog operations={operations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVLTreeVisualizer;