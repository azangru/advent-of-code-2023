export type NodeMatrix = Array<Node|null>[];

export const parseInput = (input: string) => {
  const lines = input.trim().split('\n')
    .map(line => line.trim());

  const nodeMatrix = instantiateNodes(lines);
  connectNodes(nodeMatrix);

  console.log('nodeMatrix', nodeMatrix);

  return nodeMatrix;
};

const instantiateNodes = (lines: string[]): NodeMatrix => {
  const matrix: NodeMatrix = [];

  for (const line of lines) {
    const row = new Array(line.length).fill(null);
    matrix.push(row);

    for (let i = 0; i < row.length; i++) {
      const character = line[i];

      if (character === '.') {
        continue;
      }

      const node = new Node(character);
      row[i] = node;
    }
  }

  return matrix;
};



/*
Legend:

| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
*/

const connectNodes = (matrix: NodeMatrix) => {
  const rowLength = matrix[0].length;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < rowLength; j++) {
      const node = matrix[i][j];
      if (!node) {
        continue;
      }
      if (node.symbol === '|') {
        const topNode = matrix[i - 1]?.[j];
        const bottomNode = matrix[i + 1]?.[j];

        if (!topNode || !bottomNode) {
          continue;
        }

        node.top = topNode;
        topNode.bottom = node;
        node.bottom = bottomNode;
        bottomNode.top = node;
      } else if (node.symbol === '-') {
        const leftNode = matrix[i][j - 1];
        const rightNode = matrix[i][j + 1];

        if (!leftNode || !rightNode) {
          continue;
        }

        node.left = leftNode;
        leftNode.right = node;
        node.right = rightNode;
        rightNode.left = node;
      } else if (node.symbol === 'L') {
        const topNode = matrix[i - 1]?.[j];
        const rightNode = matrix[i][j + 1];

        if (!topNode || !rightNode) {
          continue;
        }

        node.top = topNode;
        topNode.bottom = node;
        node.right = rightNode;
        rightNode.left = node;
      } else if (node.symbol === 'J') {
        const topNode = matrix[i - 1][j];
        const leftNode = matrix[i][j - 1];

        if (!topNode || !topNode) {
          continue;
        }

        node.top = topNode;
        topNode.bottom = node;
        node.left = leftNode;
        leftNode.right = node;
      } else if (node.symbol === '7') {
        const leftNode = matrix[i][j - 1];
        const bottomNode = matrix[i + 1]?.[j];

        if (!leftNode || !bottomNode) {
          continue;
        }

        node.left = leftNode;
        leftNode.right = node;
        node.bottom = bottomNode;
        bottomNode.top = node; 
      } else if (node.symbol === 'F') {
        const rightNode = matrix[i][j + 1];
        const bottomNode = matrix[i + 1]?.[j];

        if (!rightNode || !bottomNode) {
          continue;
        }

        node.right = rightNode;
        rightNode.left = node;
        node.bottom = bottomNode;
        bottomNode.top = node; 
      }
    }
  }
};

export class Node {
  public isStart = false;
  
  left: Node | null;
  right: Node | null;
  top: Node | null;
  bottom: Node | null;

  constructor(public symbol: string) {
    if (symbol === 'S') {
      this.isStart = true;
    }
  }
};


