import { useCallback, useState } from "react";
import type { Node } from "../nodes.interfaces";
//import { nodes as initialNodes } from '../nodes-data-long';
//import { nodes as initialNodes } from '../nodes-data-large-deep';
import { nodes as initialNodes } from "../nodes-data-simple";
import { isGroupNode } from "./typeguards";

const filterNodesDeep = (
  nodes: Node[],
  cb: (
    node: Node,
    index: number,
    branchIndex: number | undefined,
    parentId: string | undefined,
    currentList: Node[]
  ) => boolean,
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

    if (isGroupNode(node)) {
      const filteredChildren: Node[][] = [];
      for (let bIndex = 0; bIndex < node.children.length; bIndex++) {
        const branch = node.children[bIndex];
        const filteredBranch = filterNodesDeep(branch, cb, bIndex, node.id);
        filteredChildren.push(filteredBranch);
      }

      filtered.push({
        ...node,
        children: filteredChildren,
      });
    } else {
      filtered.push(node);
    }
  }

  return filtered;
};

const insertNode = (
  nodes: Node[],
  node: Node,
  parentId: string | undefined,
  branchIndex: number | undefined,
  index: number,
  insertNewBranch?: boolean
): Node[] => {
  if (parentId === undefined) {
    const result = [...nodes];
    result.splice(index, 0, node);
    return result;
  }

  return nodes.map((currentNode) => {
    if (isGroupNode(currentNode)) {
      if (currentNode.id === parentId) {
        if (branchIndex === undefined) {
          return currentNode;
        }

        const actualBranchIndex =
          branchIndex >= 0
            ? branchIndex
            : currentNode.children.length + branchIndex + 1;
        console.log("actualBranchIndex: ", actualBranchIndex);
        if (
          insertNewBranch &&
          actualBranchIndex === currentNode.children.length
        ) {
          return {
            ...currentNode,
            children: [...currentNode.children, [node]],
          };
        }

        if (insertNewBranch) {
          return {
            ...currentNode,
            children: [
              ...currentNode.children.slice(0, actualBranchIndex),
              [node],
              ...currentNode.children.slice(actualBranchIndex),
            ],
          };
        }

        const newChildren = currentNode.children.map((branch, bIndex) => {
          if (actualBranchIndex >= 0 && bIndex !== actualBranchIndex) {
            return branch;
          }
          const newBranch = [...branch];
          newBranch.splice(index, 0, node);
          return newBranch;
        });

        return {
          ...currentNode,
          children: newChildren,
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
        children: newChildren,
      };
    }
    return currentNode;
  });
};

export const useNodesModel = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const deleteNode = useCallback(
    (id: string) => {
      console.log("deleteNode", id, nodes);
      setNodes(filterNodesDeep(nodes, (node) => node.id !== id));
    },
    [nodes]
  );

  const addNode = useCallback(
    (
      node: Node,
      parentId: string,
      branchIndex: number,
      index: number,
      insertNewBranch?: boolean
    ) => {
      setNodes(
        insertNode(nodes, node, parentId, branchIndex, index, insertNewBranch)
      );
    },
    [nodes]
  );

  const addEmptyNode = useCallback(
    (
      parentId: string,
      branchIndex: number,
      index: number,
      insertNewBranch?: boolean
    ) => {
      addNode(
        { id: `empty-${Date.now()}`, type: "empty" },
        parentId,
        branchIndex,
        index,
        insertNewBranch
      );
    },
    [addNode]
  );

  return {
    nodes: nodes,
    deleteNode,
    addNode,
    addEmptyNode,
  };
};
