import type { Node } from "../nodes.interfaces";

export interface DefaultNodeData extends Record<string, unknown> {
  name?: string;
  component?: {
    name?: string;
  };
  delete: (id: string) => void;
  parentId?: string;
  branchIndex?: number;
  index: number;
  branchLength: number;
  addNode: (node: Node, parentId: string | undefined, branchIndex: number | undefined, index: number) => void;
}

export interface GroupNodeData extends DefaultNodeData {
  isCollapsed: boolean;
  addEmptyNode: (parentId: string | undefined, branchIndex: number | undefined, index: number, insertBranch?: boolean) => void;
  collapse: (id: string, isCollapsed: boolean) => void;
}