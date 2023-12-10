import { parseInput, type NodeMatrix, type Node } from "./parseInput";

export const solvePart1 = (input: string) => {
  const nodeMatrix = parseInput(input);

  const startNode = findStartNode(nodeMatrix);

  return travelLoop(startNode) / 2;
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

const travelLoop = (startNode: Node) => {
  let hasCompletedLoop = false;
  let previousNode = startNode;
  let currentNode = getNextNode(startNode, previousNode);
  let count = 1;

  console.log('currentNode', currentNode);

  while (!hasCompletedLoop) {
    const nextNode = getNextNode(currentNode, previousNode);
    hasCompletedLoop = !!nextNode.isStart;
    previousNode = currentNode;
    currentNode = nextNode;
    count++;
  }

  return count;
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
