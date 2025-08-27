// src/utils/AVLTree.js

// AVL Tree Node class
export class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.x = 0;
    this.y = 0;
  }
}

// AVL Tree class with all operations
export class AVLTree {
  constructor() {
    this.root = null;
    this.operations = [];
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    
    x.right = y;
    y.left = T2;
    
    this.updateHeight(y);
    this.updateHeight(x);
    
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    
    y.left = x;
    x.right = T2;
    
    this.updateHeight(x);
    this.updateHeight(y);
    
    return y;
  }

  insert(node, value) {
    // Standard BST insertion
    if (!node) {
      this.operations.push(`Inserted ${value}`);
      return new AVLNode(value);
    }

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    // Update height
    this.updateHeight(node);

    // Get balance factor
    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      this.operations.push(`Right rotation at ${node.value}`);
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      this.operations.push(`Left rotation at ${node.value}`);
      return this.rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      this.operations.push(`Left-Right rotation at ${node.value}`);
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      this.operations.push(`Right-Left rotation at ${node.value}`);
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  delete(node, value) {
    if (!node) return node;

    if (value < node.value) {
      node.left = this.delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.delete(node.right, value);
    } else {
      this.operations.push(`Deleted ${value}`);
      
      if (!node.left || !node.right) {
        const temp = node.left || node.right;
        if (!temp) {
          node = null;
        } else {
          node = temp;
        }
      } else {
        const temp = this.findMin(node.right);
        node.value = temp.value;
        node.right = this.delete(node.right, temp.value);
      }
    }

    if (!node) return node;

    this.updateHeight(node);
    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && this.getBalance(node.left) >= 0) {
      this.operations.push(`Right rotation at ${node.value}`);
      return this.rotateRight(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalance(node.left) < 0) {
      this.operations.push(`Left-Right rotation at ${node.value}`);
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalance(node.right) <= 0) {
      this.operations.push(`Left rotation at ${node.value}`);
      return this.rotateLeft(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalance(node.right) > 0) {
      this.operations.push(`Right-Left rotation at ${node.value}`);
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  insertValue(value) {
    this.root = this.insert(this.root, value);
    this.calculatePositions();
  }

  deleteValue(value) {
    this.root = this.delete(this.root, value);
    this.calculatePositions();
  }

  calculatePositions() {
    if (!this.root) return;
    
    // First, calculate the width needed for proper spacing
    const getTreeWidth = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      return getTreeWidth(node.left) + getTreeWidth(node.right);
    };

    const assignPositions = (node, x, y, spacing) => {
      if (!node) return x;

      // Position left subtree
      const leftX = assignPositions(node.left, x, y + 100, spacing / 2);
      
      // Position current node
      node.x = leftX;
      node.y = y;
      
      // Position right subtree
      const rightX = assignPositions(node.right, leftX + spacing, y + 100, spacing / 2);
      
      return rightX;
    };

    // Calculate initial spacing based on tree width
    const treeWidth = getTreeWidth(this.root);
    const initialSpacing = Math.max(120, treeWidth * 60);
    
    // Start positioning from center
    const startX = 400 - (initialSpacing / 2);
    assignPositions(this.root, startX, 60, initialSpacing);

    // Alternative in-order positioning for better balance
    this.inorderPositioning();
  }

  inorderPositioning() {
    if (!this.root) return;
    
    let nodeList = [];
    
    // Collect nodes in in-order with their depths
    const collectNodes = (node, depth) => {
      if (!node) return;
      
      collectNodes(node.left, depth + 1);
      nodeList.push({ node, depth });
      collectNodes(node.right, depth + 1);
    };
    
    collectNodes(this.root, 0);
    
    // Calculate positions
    const nodeSpacing = 90;
    const levelHeight = 80;
    const startX = 400 - ((nodeList.length - 1) * nodeSpacing) / 2;
    
    nodeList.forEach((item, index) => {
      item.node.x = startX + (index * nodeSpacing);
      item.node.y = 60 + (item.depth * levelHeight);
    });
  }

  inorderTraversal(node = this.root, result = []) {
    if (node) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
    return result;
  }

  preorderTraversal(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
    return result;
  }

  postorderTraversal(node = this.root, result = []) {
    if (node) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  levelOrderTraversal() {
    if (!this.root) return [];
    
    const result = [];
    const queue = [this.root];
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const level = [];
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        level.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      
      result.push(level);
    }
    
    return result;
  }

  search(value, node = this.root, path = []) {
    if (!node) return { found: false, path };
    
    path.push(node.value);
    
    if (value === node.value) {
      return { found: true, path };
    } else if (value < node.value) {
      return this.search(value, node.left, path);
    } else {
      return this.search(value, node.right, path);
    }
  }

  clear() {
    this.root = null;
    this.operations = [];
  }
}