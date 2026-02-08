export interface GroupNodeData extends Record<string, unknown> {
  name?: string;
  component?: {
    name: string;
  }
  isCollapsed: boolean;
  collapse: (id: string, isCollapsed: boolean) => void;
  delete: (id: string) => void;
}


export interface DefaultNodeData extends Record<string, unknown> {
  name?: string;
  component?: {
    name?: string;
  };
  delete: (id: string) => void;
}