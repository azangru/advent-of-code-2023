export type NodeMatrix = Array<Node|null>[];

export const parseInput = (input: string) => {
  const lines = input.trim().split('\n')
    .map(line => line.trim());

  const nodeMatrix = instantiateNodes(lines);
  connectNodes(nodeMatrix);

  // console.log('nodeMatrix', nodeMatrix);

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

/**
 * FIXME: the parsing is incorrect;
 * only nodes that have a reciprocal node on the other side can get connected
 */
const connectNodes = (matrix: NodeMatrix) => {
  const rowLength = matrix[0].length;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < rowLength; j++) {
      const node = matrix[i][j];
      if (!node) {
        continue;
      }
      const nodeAbove = matrix[i - 1]?.[j];
      const nodeBelow = matrix[i + 1]?.[j];
      const nodeLeft = matrix[i][j - 1];
      const nodeRight = matrix[i][j + 1];

      if (canConnectBottom(node) && canConnectTop(nodeBelow)) {
        node.bottom = nodeBelow;
        nodeBelow.top = node;
      }
      if (canConnectTop(node) && canConnectBottom(nodeAbove)) {
        node.top = nodeAbove;
        nodeAbove.bottom = node;
      }
      if (canConnectLeft(node) && canConnectRight(nodeLeft)) {
        node.left = nodeLeft;
        nodeLeft.right = node;
      }
      if (canConnectRight(node) && canConnectLeft(nodeRight)) {
        node.right = nodeRight;
        nodeRight.left = node;
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


const canConnectLeft = (node: Node | undefined) => {
  if (!node) {
    return false;
  } else if (node.isStart) {
    return true;
  } else {
    return ['-', 'J', '7'].includes(node.symbol);
  }
}

const canConnectRight = (node: Node | undefined) => {
  if (!node) {
    return false;
  } else if (node.isStart) {
    return true;
  } else {
    return ['-', 'L', 'F'].includes(node.symbol);
  }
}

const canConnectTop = (node: Node | undefined) => {
  if (!node) {
    return false;
  } else if (node.isStart) {
    return true;
  } else {
    return ['|', 'L', 'J'].includes(node.symbol);
  }
}

const canConnectBottom = (node: Node | undefined) => {
  if (!node) {
    return false;
  } else if (node.isStart) {
    return true;
  } else {
    return ['|', '7', 'F'].includes(node.symbol);
  }
}
