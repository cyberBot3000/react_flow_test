interface ComponentData {
  name: string;
  type: 'default' | 'group';
}

export interface ComponentDTO {
  id: number;
  name: string;
  component: ComponentData;
}

export type HoverTarget = { parentId?: string; branchIndex?: number; position?: number } | null;

export interface DnDContextValue {
  component: ComponentDTO | null;
  setComponent: (c: ComponentDTO | null) => void;

  draggingNodeId: string | null;
  setDraggingNodeId: (id: string | null) => void;

  hoverTarget: HoverTarget;
  setHoverTarget: (t: HoverTarget) => void;
}
