// src/components/TreeNode.jsx
import React from 'react';

const TreeNode = ({ node, tree, nodeKey = 'root' }) => {
  if (!node) return null;

  const balance = tree.getBalance(node);
  const isBalanced = Math.abs(balance) <= 1;

  return (
    <g key={nodeKey}>
      {/* Left edge */}
      {node.left && (
        <line
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="#64748b"
          strokeWidth="2"
          className="transition-all duration-300"
        />
      )}
      
      {/* Right edge */}
      {node.right && (
        <line
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="#64748b"
          strokeWidth="2"
          className="transition-all duration-300"
        />
      )}
      
      {/* Node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r="25"
        fill={isBalanced ? "#10b981" : "#ef4444"}
        stroke="#1f2937"
        strokeWidth="2"
        className="transition-all duration-300 hover:r-30"
      />
      
      {/* Node value */}
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        className="fill-white font-semibold text-sm select-none"
      >
        {node.value}
      </text>
      
      {/* Height info */}
      <text
        x={node.x + 30}
        y={node.y - 20}
        textAnchor="middle"
        className="fill-gray-600 text-xs select-none"
      >
        h:{node.height}
      </text>
      
      {/* Balance factor */}
      <text
        x={node.x + 30}
        y={node.y - 5}
        textAnchor="middle"
        className="fill-gray-600 text-xs select-none"
      >
        b:{balance}
      </text>
      
      {/* Render child nodes */}
      {node.left && <TreeNode node={node.left} tree={tree} nodeKey={`${nodeKey}-left`} />}
      {node.right && <TreeNode node={node.right} tree={tree} nodeKey={`${nodeKey}-right`} />}
    </g>
  );
};

export default TreeNode;