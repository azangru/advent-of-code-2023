import { parseInput, type NodeMatrix, type Node } from "./parseInput";

export const solvePart2 = (input: string) => {
  const nodeMatrix = parseInput(input);
  const cleanMatrix = prepareCleanMatrix(nodeMatrix);

  const innerTilesCount = findInnerTiles(cleanMatrix);

  return innerTilesCount;
};

// cotains only the nodes belonging to the loop; all else is set to null
const prepareCleanMatrix = (nodeMatrix: NodeMatrix) => {
  const newMatrix = getNewMatrix(nodeMatrix);
  const startNode = findStartNode(nodeMatrix);

  const matrixWithLoopOnly = travelLoop(startNode, newMatrix);

  return matrixWithLoopOnly;
};

const getNewMatrix = (nodeMatrix: NodeMatrix) => {
  const matrixRowLength = nodeMatrix[0].length;
  return [... new Array(nodeMatrix.length)]
    .map(() => new Array(matrixRowLength).fill(null))
};

const findStartNode = (matrix: NodeMatrix) => {
  for (const row of matrix) {
    for (const node of row) {
      if (node?.isStart) {
        return node;
      }
     }
  }
};

const travelLoop = (startNode: Node, nodeMatrix: NodeMatrix) => {
  let previousNode = startNode;
  let currentNode = getNextNode(startNode, previousNode);

  let hasVisitedNode = Boolean(nodeMatrix[currentNode.rowIndex][currentNode.colummIndex]);

  while (!hasVisitedNode) {
    nodeMatrix[currentNode.rowIndex][currentNode.colummIndex] = currentNode;
    const nextNode = getNextNode(currentNode, previousNode);
    previousNode = currentNode;
    currentNode = nextNode;
    hasVisitedNode = Boolean(nodeMatrix[currentNode.rowIndex][currentNode.colummIndex]);
  }

  return nodeMatrix;
};

const getNextNode = (currentNode: Node, previousNode: Node): Node => {
  const candidateNodes = [
    currentNode.top,
    currentNode.bottom,
    currentNode.left,
    currentNode.right
  ].filter(node => Boolean(node));
  if (currentNode.isStart) {
    // it does not matter which node to pick;
    // pick any of the available two nodes
    return candidateNodes[0];
  } else {
    return candidateNodes.find(node => node !== previousNode) as Node;
  }
}


const findInnerTiles = (nodeMatrix: NodeMatrix) => {
  visualizeMaze(nodeMatrix);
  let shouldTrackTiles = false;
  let tempCount = 0;

  let tilesCount = 0;

  for (let i = 0; i < nodeMatrix.length; i++) {
    for (let j = 0; j < nodeMatrix[i].length; j++) {
      const cell = nodeMatrix[i][j]

      if (cell && !shouldTrackTiles) {
        shouldTrackTiles = true;
      } else if (cell && shouldTrackTiles) {
        shouldTrackTiles = false;
        tilesCount += tempCount;
        tempCount = 0;
      } else if (j === nodeMatrix[i].length - 1 && shouldTrackTiles) {
        shouldTrackTiles = false;
        tempCount = 0;
      } else if (shouldTrackTiles) {
        console.log({ i, j });
        tempCount++;         
      }
    }
  }

  return tilesCount;
}


const visualizeMaze = (nodeMatrix: NodeMatrix) => {
  const printMatrix: string[][] = [... new Array(nodeMatrix.length)]
    .map(() => new Array(nodeMatrix[0].length).fill('.'))

  for (let i = 0; i < nodeMatrix.length; i++) {
    for (let j = 0; j < nodeMatrix[i].length; j++) {
      if (nodeMatrix[i][j]) {
        printMatrix[i][j] = 'x';
      }
    }
  }

  console.log(printMatrix.map(row => row.join('')).join('\n'));
};


/*

.xxxxxxxxxxxxxxx....
.xxxxxxxxxxxxxxx....
.xx.xxxxxxxxxxxx....
xxxxxxxxxxxxxx.xxx..
xxxx.xx...xxxxxxxxx.
....xxx..xxxxxxxxxxx
....xx.xxxxxxx.xxxxx
.....xxxxxxxxxxxx.xx
....xxxxx.xx.xxxx...
....xxxxx.xx.xxxx...

*/
