// src/components/SearchPanel.jsx
import React from 'react';

const SearchPanel = ({
  searchValue,
  setSearchValue,
  onSearch,
  searchResult
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">Search</h2>
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter value to search"
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 border border-slate-600 focus:border-cyan-400 focus:outline-none"
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <button
          onClick={onSearch}
          className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
        >
          Search
        </button>
        
        {searchResult && (
          <div className="mt-4 p-3 bg-slate-700 rounded-lg">
            <div className={`font-semibold ${searchResult.found ? 'text-green-400' : 'text-red-400'}`}>
              {searchResult.found ? 'Found!' : 'Not Found'}
            </div>
            {searchResult.path.length > 0 && (
              <div className="text-sm text-slate-300 mt-2">
                Path: {searchResult.path.join(' → ')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;