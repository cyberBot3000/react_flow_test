import type { EmptyNodeType, GroupNodeType, Node } from "../nodes.interfaces";

export const isGroupNode = (node: Node): node is GroupNodeType => {
  return node.type === "group" && node.children !== undefined;
};

export const isEmptyNode = (node: Node): node is EmptyNodeType => {
  return node.type === "empty";
};