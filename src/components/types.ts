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
  addEmptyNode: (parentId: string | undefined, branchIndex: number | undefined, index: number, insertBranch?: boolean) => void;
}

export interface GroupNodeData extends DefaultNodeData {
  isCollapsed: boolean;
  collapse: (id: string, isCollapsed: boolean) => void;
}