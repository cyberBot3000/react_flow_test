import { type Node as FlowNode, type Edge, Position } from '@xyflow/react';
import type { GroupNodeType, Node } from './nodes.interfaces';
import type { DefaultNodeData, EdgeData, GroupNodeData } from './components/types';
import { isEmptyNode, isGroupNode } from './model/typeguards';

const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;
const HORIZONTAL_GAP = 50;
const VERTICAL_GAP = 20;
const GROUP_PADDING = {
  top: 10,
  bottom: 10,
  left: 160,
  right: 30,
};
const MIN_GROUP_NODE_HEIGHT = 100;

type LayoutResult = {
  nodes: FlowNode[];
  edges: Edge[];
  width: number;
  height: number;
};

interface BuildFlowOptions {
  deleteNode: (id: string) => void;
  addNode: (node: Node, parentId: string | undefined, branchIndex: number | undefined, index: number) => void;
  handleNodeCollapse: (id: string, isCollapsed: boolean) => void;
  collapsedNodes: Record<string, boolean>;
  addEmptyNode: (parentId: string | undefined, branchIndex: number | undefined, index: number, insertNewBranch?: boolean) => void;
}

interface LayoutOptions extends BuildFlowOptions {
  zIndex: number;
}

export function buildFlowFromTree(treeNodes: Node[], options: BuildFlowOptions): { nodes: FlowNode[]; edges: Edge[] } {
  console.log('buildFlowFromTree', treeNodes);
  const result = layoutList(treeNodes, 0, 0, '', undefined, { zIndex: 0, ...options });
  return { nodes: result.nodes, edges: result.edges };
}

function layoutGroup(
  node: GroupNodeType,
  startX: number,
  startY: number = 0,
  parentId: string | undefined,
  branchIndex: number | undefined,
  branchLength: number,
  index: number,
  { zIndex = 0, ...options }: LayoutOptions
): LayoutResult {
  const nodes: FlowNode[] = [];
  const edges: Edge[] = [];

  const groupId = node.id;

  let maxListWidth = 0;
  let currentY = GROUP_PADDING.top;
  const listLayouts: LayoutResult[] = [];
  const hasChildren = node.children.some((list) => list.length > 0);

  if (!options.collapsedNodes[groupId]) {
    for (let bIndex = 0; bIndex < node.children.length; bIndex++) {
      const childList = node.children[bIndex];
      if (childList.length === 0) {
        continue;
      }
      const listLayout = layoutList(childList, GROUP_PADDING.left, currentY, groupId, bIndex, { zIndex: zIndex + 1, ...options });
      listLayouts.push(listLayout);

      maxListWidth = Math.max(maxListWidth, listLayout.width);
      currentY += listLayout.height + VERTICAL_GAP;
    }
  }

  const totalHeight = currentY - GROUP_PADDING.top - VERTICAL_GAP;

  const groupHeight = Math.max(totalHeight + GROUP_PADDING.top + GROUP_PADDING.bottom, MIN_GROUP_NODE_HEIGHT);
  const groupWidth = maxListWidth + (!options.collapsedNodes[groupId] && hasChildren ? GROUP_PADDING.left + GROUP_PADDING.right : NODE_WIDTH);

  const groupData: GroupNodeData = {
    name: node.name,
    component: {
      name: node.name,
    },
    isCollapsed: options.collapsedNodes[groupId] || false,
    collapse: options.handleNodeCollapse,
    delete: options.deleteNode,
    addEmptyNode: options.addEmptyNode,
    addNode: options.addNode,
    branchLength: branchLength,
    index: index,
    parentId: parentId,
    branchIndex: branchIndex,
  };

  const parentNode: FlowNode = {
    id: node.id,
    type: 'GroupNode',
    data: groupData,
    position: {
      x: startX,
      y: startY,
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

  if (!options.collapsedNodes[groupId]) {
    listLayouts.forEach((layout) => {
      nodes.push(...layout.nodes);
      edges.push(...layout.edges);
    });

    for (let bIndex = 0; bIndex < node.children.length; bIndex++) {
      const childList = node.children[bIndex];
      if (childList.length > 0) {
        edges.push(
          createEdge(
            { addNode: options.addNode, parentId: node.id, branchIndex: bIndex, index: 0, branchLength: childList.length },
            node.id,
            childList[0].id,
            'inner-source'
          )
        );
      }
    }
  }

  return {
    nodes,
    edges,
    width: groupWidth,
    height: Math.max(NODE_HEIGHT, groupHeight),
  };
}

function layoutList(
  nodeList: Node[],
  startX: number,
  startY: number,
  parentId: string | undefined,
  branchIndex: number | undefined,
  { zIndex = 0, ...options }: LayoutOptions
): LayoutResult {
  const nodes: FlowNode[] = [];
  const edges: Edge[] = [];
  let currentX = 0;
  let maxHeight = NODE_HEIGHT;

  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];
    const prevNode = i > 0 ? nodeList[i - 1] : null;

    const defaultData: DefaultNodeData = {
      name: !isEmptyNode(node) ? node.name : undefined,
      component: !isEmptyNode(node) ? { name: node.name } : undefined,
      delete: options.deleteNode,
      parentId: parentId,
      branchIndex: branchIndex,
      index: i,
      branchLength: nodeList.length,
      addNode: options.addNode,
    };

    if (!isGroupNode(node)) {
      const flowNode: FlowNode = {
        id: node.id,
        type: node.type === 'empty' ? 'EmptyNode' : 'DefaultNode',
        data: defaultData,
        position: {
          x: startX + currentX,
          y: startY,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        parentId: parentId,
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
        if (isGroupNode(prevNode) && prevNode.children.length > 0) {
          sourceHandle = 'outer-source';
        }
        edges.push(
          createEdge(
            { addNode: options.addNode, parentId: parentId, branchIndex: branchIndex, index: i, branchLength: nodeList.length },
            prevNode.id,
            node.id,
            sourceHandle
          )
        );
      }

      currentX += NODE_WIDTH + HORIZONTAL_GAP;
    } else {
      const groupLayout = layoutGroup(node, startX + currentX, startY, parentId, branchIndex, nodeList.length, i, { zIndex, ...options });
      nodes.push(...groupLayout.nodes);
      edges.push(...groupLayout.edges);

      if (prevNode) {
        let sourceHandle = undefined;
        const targetHandle = 'outer-target';
        if (isGroupNode(prevNode)) {
          sourceHandle = 'outer-source';
        }
        edges.push(
          createEdge(
            { addNode: options.addNode, parentId: parentId, branchIndex: branchIndex, index: i, branchLength: nodeList.length },
            prevNode.id,
            node.id,
            sourceHandle,
            targetHandle
          )
        );
      }

      currentX += groupLayout.width + HORIZONTAL_GAP;
      maxHeight = Math.max(maxHeight, groupLayout.height);
    }
  }

  currentX -= HORIZONTAL_GAP

  const yCenteredNodes = nodes.map((node) => {
    const matchList = nodeList.find((n) => n.id === node.id);
    if (matchList) {
      const listCenteredShift = node.measured?.height ? (maxHeight - node.measured.height) / 2 : 0;
      return {
        ...node,
        position: {
          ...node.position,
          y: startY + listCenteredShift,
        },
      };
    }
    return node;
  });

  return {
    nodes: yCenteredNodes,
    edges,
    width: currentX,
    height: maxHeight,
  };
}

function createEdge(data: EdgeData, sourceId: string, targetId: string, sourceHandle?: string, targetHandle?: string): Edge {
  return {
    id: `${sourceId}_${targetId}`,
    source: sourceId,
    target: targetId,
    sourceHandle: sourceHandle,
    targetHandle: targetHandle,
    type: 'LabeledEdge',
    data,
  };
}
