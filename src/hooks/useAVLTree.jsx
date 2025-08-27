// src/hooks/useAVLTree.js
import { useState, useEffect, useCallback } from 'react';
import { AVLTree } from '../utils/AVLTree';

export const useAVLTree = () => {
  const [tree] = useState(new AVLTree());
  const [treeData, setTreeData] = useState(null);
  const [operations, setOperations] = useState([]);
  const [traversalResult, setTraversalResult] = useState([]);
  const [traversalType, setTraversalType] = useState('inorder');

  const updateTreeDisplay = useCallback(() => {
    setTreeData(tree.root ? { ...tree.root } : null);
    setOperations([...tree.operations]);
  }, [tree]);

  const updateTraversal = useCallback(() => {
    let result = [];
    switch (traversalType) {
      case 'inorder':
        result = tree.inorderTraversal();
        break;
      case 'preorder':
        result = tree.preorderTraversal();
        break;
      case 'postorder':
        result = tree.postorderTraversal();
        break;
      case 'levelorder':
        result = tree.levelOrderTraversal();
        break;
      default:
        result = tree.inorderTraversal();
    }
    setTraversalResult(result);
  }, [tree, traversalType]);

  const insertValue = useCallback((value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return false;
    
    tree.insertValue(numValue);
    updateTreeDisplay();
    return true;
  }, [tree, updateTreeDisplay]);

  const deleteValue = useCallback((value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return false;
    
    tree.deleteValue(numValue);
    updateTreeDisplay();
    return true;
  }, [tree, updateTreeDisplay]);

  const searchValue = useCallback((value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return null;
    
    return tree.search(numValue);
  }, [tree]);

  const clearTree = useCallback(() => {
    tree.clear();
    setTreeData(null);
    setOperations([]);
    setTraversalResult([]);
  }, [tree]);

  const exportTreeData = useCallback(() => {
    const data = {
      traversals: {
        inorder: tree.inorderTraversal(),
        preorder: tree.preorderTraversal(),
        postorder: tree.postorderTraversal(),
        levelorder: tree.levelOrderTraversal()
      },
      operations: tree.operations
    };
    return data;
  }, [tree]);

  useEffect(() => {
    updateTraversal();
  }, [updateTraversal]);

  return {
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
    exportTreeData,
    updateTreeDisplay
  };
};