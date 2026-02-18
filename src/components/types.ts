import type { AddEmptyNode, AddNode, CollapseGroup, DeleteNode } from "../model/types";

export interface EdgeData extends Record<string, unknown> {
  parentId?: string;
  branchIndex?: number;
  index: number;
  branchLength: number;
  addNode: AddNode; 
}

export interface DefaultNodeData extends Record<string, unknown> {
  name?: string;
  component?: {
    name?: string;
  };
  delete: DeleteNode;
  parentId?: string;
  branchIndex?: number;
  index: number;
  branchLength: number;
  addNode: AddNode; 
}

export interface GroupNodeData extends DefaultNodeData {
  isCollapsed: boolean;
  addEmptyNode: AddEmptyNode;
  collapse: CollapseGroup;
}