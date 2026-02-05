import { type Node as FlowNode, type Edge, Position } from '@xyflow/react';
import type { Node } from './nodes.interfaces';
import type { DefaultNodeData, GroupNodeData } from './components/types';

const NODE_WIDTH = 150;
const NODE_HEIGHT = 70;
const HORIZONTAL_GAP = 50;
const VERTICAL_GAP = 20;
const GROUP_PADDING = {
  top: 20,
  bottom: 20,
  left: 120,
  right: 20,
};

type LayoutResult = {
  nodes: FlowNode[];
  edges: Edge[];
  width: number;
  height: number;
};

interface BuildFlowOptions {
  handleNodeCollapse: (id: string, isCollapsed: boolean) => void;
  collapsedNodes: Record<string, boolean>;
}

interface LayoutOptions extends BuildFlowOptions {
  zIndex: number;
}

export function buildFlowFromTree(treeNodes: Node[], options: BuildFlowOptions): { nodes: FlowNode[]; edges: Edge[] } {
  const result = layoutList(treeNodes, 0, 0, '', { zIndex: 0, ...options });
  return { nodes: result.nodes, edges: result.edges };
}

function layoutGroup(
  node: Node,
  startX: number,
  startY: number = 0,
  parentId: string | undefined,
  { zIndex = 0, handleNodeCollapse, collapsedNodes }: LayoutOptions
): LayoutResult {
  //console.log('layoutGroup', node.name, startX, startY, parentId, zIndex);
  const nodes: FlowNode[] = [];
  const edges: Edge[] = [];

  const groupId = node.id;

  let maxListWidth = 0;
  let currentY = GROUP_PADDING.top;
  const listLayouts: LayoutResult[] = [];

  if (!collapsedNodes[groupId]) {
    for (const childList of node.children) {
      const listLayout = layoutList(childList, GROUP_PADDING.left, currentY, groupId, { zIndex: zIndex + 1, handleNodeCollapse, collapsedNodes });
      listLayouts.push(listLayout);

      maxListWidth = Math.max(maxListWidth, listLayout.width);
      currentY += listLayout.height + VERTICAL_GAP;
    }
  }

  const totalHeight = currentY - GROUP_PADDING.top - VERTICAL_GAP;

  const groupHeight = totalHeight + GROUP_PADDING.top + GROUP_PADDING.bottom;
  const groupWidth = maxListWidth + GROUP_PADDING.left + GROUP_PADDING.right;
  const groupY = startY + (parentId ? GROUP_PADDING.top : 0) + (NODE_HEIGHT - groupHeight) / 2;
  const groupX = startX;

  const groupData: GroupNodeData = {
    name: node.name,
    component: {
      name: node.name,
    },
    isCollapsed: collapsedNodes[groupId] || false,
    collapse: handleNodeCollapse,
    delete: (id: string) => {
      console.log('delete', id);
    },
  };

  const parentNode: FlowNode = {
    id: node.id,
    type: 'GroupNode',
    data: groupData,
    position: {
      x: groupX,
      y: groupY,
    },
    parentId: parentId,
    zIndex: zIndex,
    measured: {
      width: groupWidth,
      height: groupHeight,
    },
    extent: 'parent',
  };
  nodes.push(parentNode);

  if (!collapsedNodes[groupId]) {
    let listY = GROUP_PADDING.top;
    for (let i = 0; i < listLayouts.length; i++) {
      const listLayout = listLayouts[i];
      //console.log('listLayout', node.id, listLayout);
      const relativeNodes = listLayout.nodes.map((n) => {
        const matchList = node.children[i].find((childNode) => childNode.id === n.id && n.parentId === node.id); //|| getGroupId(childNode) === n.id
        let y = n.position.y;
        if (matchList) {
          //console.log('matchList', node, n, '\n',listLayout.height, NODE_HEIGHT);
          const listCenteredShift = n.measured?.height ? (listLayout.height - n.measured.height) / 2 : 0;
          y = listY + listCenteredShift;
        }
        return {
          ...n,
          position: {
            ...n.position,
            y,
          },
        };
      });
      listY += listLayout.height + VERTICAL_GAP;
      nodes.push(...relativeNodes);
      edges.push(...listLayout.edges);
    }

    for (const childList of node.children) {
      if (childList.length > 0) {
        edges.push(createEdge(node.id, childList[0].id, 'inner-source'));
      }
    }
  }

  const relativeWidth = NODE_WIDTH / 2 + groupWidth;

  return {
    nodes,
    edges,
    width: relativeWidth,
    height: Math.max(NODE_HEIGHT, groupHeight),
  };
}

function layoutList(
  nodeList: Node[],
  startX: number,
  startY: number,
  parentId: string | undefined,
  { zIndex = 0, handleNodeCollapse, collapsedNodes }: LayoutOptions
): LayoutResult {
  // console.log(
  //   'layoutList',
  //   nodeList.map((n) => n.name),
  //   startX,
  //   startY,
  //   parentId,
  //   zIndex
  // );
  const nodes: FlowNode[] = [];
  const edges: Edge[] = [];
  let currentX = 0;
  let maxHeight = NODE_HEIGHT;

  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];
    const prevNode = i > 0 ? nodeList[i - 1] : null;

    const defaultData: DefaultNodeData = {
      name: node.name,
      component: {
        name: node.name,
      },
      delete: (id: string) => {
        console.log('delete', id);
      },
    };

    if (node.children.length === 0) {
      const flowNode: FlowNode = {
        id: node.id,
        type: 'DefaultNode',
        data: defaultData,
        position: {
          x: startX + currentX,
          y: startY,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        parentId: parentId || undefined,
        zIndex,
        measured: {
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        },
        extent: 'parent',
      };
      nodes.push(flowNode);

      if (prevNode) {
        let sourceHandle = 'outer-source';
        let targetHandle = undefined;
        if (prevNode.children.length > 0) {
          sourceHandle = 'outer-source';
        }
        if (node.children.length > 0) {
          targetHandle = 'inner-target';
        }
        edges.push(createEdge(prevNode.id, node.id, sourceHandle, targetHandle));
      }

      currentX += NODE_WIDTH + HORIZONTAL_GAP;
    } else {
      const groupLayout = layoutGroup(node, startX + currentX, startY, parentId || undefined, { zIndex, handleNodeCollapse, collapsedNodes });
      nodes.push(...groupLayout.nodes);
      edges.push(...groupLayout.edges);

      if (prevNode) {
        let sourceHandle = undefined;
        const targetHandle = 'outer-target';
        if (prevNode.children.length > 0) {
          sourceHandle = 'outer-source';
        }
        edges.push(createEdge(prevNode.id, node.id, sourceHandle, targetHandle));
      }

      currentX += groupLayout.width + HORIZONTAL_GAP;
      maxHeight = Math.max(maxHeight, groupLayout.height);
    }
  }

  return {
    nodes,
    edges,
    width: currentX,
    height: maxHeight,
  };
}

function createEdge(sourceId: string, targetId: string, sourceHandle?: string, targetHandle?: string): Edge {
  return {
    id: `${sourceId}_${targetId}`,
    source: sourceId,
    target: targetId,
    sourceHandle: sourceHandle,
    targetHandle: targetHandle,
    type: 'smoothstep',
  };
}
