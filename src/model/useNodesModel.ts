import { useCallback, useState } from "react";
import type { Node } from "../nodes.interfaces";
//import { nodes as initialNodes } from '../nodes-data-long';
//import { nodes as initialNodes } from '../nodes-data-large-deep';
import { nodes as initialNodes } from '../nodes-data-simple';


const filterNodesDeep = (
  nodes: Node[], 
  cb: (node: Node, index: number, branchIndex: number | undefined, parentId: string | undefined, currentList: Node[]) => boolean,
  branchIndex?: number,
  parentId?: string
): Node[] => {
  const filtered: Node[] = [];

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    const shouldKeep = cb(node, index, branchIndex, parentId, nodes);
    
    if (!shouldKeep) {
      continue;
    }

    if (node.children.length === 0) {
      filtered.push(node);
      continue;
    }

    const filteredChildren: Node[][] = [];
    for (let bIndex = 0; bIndex < node.children.length; bIndex++) {
      const branch = node.children[bIndex];
      const filteredBranch = filterNodesDeep(branch, cb, bIndex, node.id);
      filteredChildren.push(filteredBranch);
    }

    filtered.push({
      ...node,
      children: filteredChildren
    });
  }

  return filtered;
};

const insertNode = (
  nodes: Node[], 
  node: Node, 
  parentId: string | undefined, 
  branchIndex: number | undefined, 
  index: number
): Node[] => {
  if (parentId === undefined) {
    const result = [...nodes];
    result.splice(index, 0, node);
    return result;
  }

  return nodes.map((currentNode) => {
    if (currentNode.id === parentId) {
      if (branchIndex === undefined) {
        return currentNode;
      }

      const newChildren = currentNode.children.map((branch, bIndex) => {
        if (bIndex !== branchIndex) {
          return branch;
        }

        const newBranch = [...branch];
        newBranch.splice(index, 0, node);
        return newBranch;
      });

      return {
        ...currentNode,
        children: newChildren
      };
    }

    if (currentNode.children.length === 0) {
      return currentNode;
    }

    const newChildren = currentNode.children.map((branch) => 
      insertNode(branch, node, parentId, branchIndex, index)
    );

    return {
      ...currentNode,
      children: newChildren
    };
  });
};

export const useNodesModel = () => {

  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const deleteNode = useCallback((id: string) => {
    setNodes(filterNodesDeep(nodes, (node) => node.id !== id));
  }, [nodes]);

  const addNode = useCallback((node: Node, parentId: string, branchIndex: number, index: number) => {
    insertNode(nodes, node, parentId, branchIndex, index);
  }, [nodes]);
  
  return {
    nodes: nodes,
    deleteNode,
    addNode,
  };
};