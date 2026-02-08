export interface DefaultNodeData extends Record<string, unknown> {
  name?: string;
  component?: {
    name?: string;
  };
  delete: (id: string) => void;
}

export interface GroupNodeData extends DefaultNodeData {
  isCollapsed: boolean;
  collapse: (id: string, isCollapsed: boolean) => void;
  addEmptyNode: (parentId: string, branchIndex: number, index: number, insertBranch?: boolean) => void;
}