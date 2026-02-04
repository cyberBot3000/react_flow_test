import { type Node as FlowNode, type Edge, Position } from '@xyflow/react';

export const nodes: FlowNode[] = [
  {
    id: 'http-trigger',
    type: 'default',
    data: {
      label: 'HTTP Trigger',
    },
    position: {
      x: 0,
      y: 0,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'active-mq',
    type: 'default',
    data: {
      label: 'Active MQ 6.X',
    },
    position: {
      x: 250,
      y: 0,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'parallel',
    type: 'default',
    data: {
      label: 'Parallel',
    },
    position: {
      x: 470,
      y: 0,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    measured: {
      width: 150,
      height: 40,
    },
    selected: true,
    dragging: false,
  },
  {
    id: 'parallel-group',
    data: {
      label: '',
    },
    position: {
      x: 540,
      y: -40,
    },
    type: 'input',
    sourcePosition: Position.Right,
    style: {
      backgroundColor: 'rgba(255, 0, 255, 0.2)',
      height: 40 + 40 + 30*3,
      width: 270,
    },
    measured: {
      width: 540,
      height: 120,
    },
    selected: false,
    dragging: false,
    width: 540,
    height: 120,
    resizing: false,
  },
  {
    id: 'script',
    type: 'default',
    data: {
      label: 'Script',
    },
    position: {
      x: 170,
      y: 11,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'parallel-group',
    measured: {
      width: 150,
      height: 40,
    },
    selected: false,
    dragging: false,
  },
  {
    id: 'smtp',
    type: 'default',
    data: {
      label: 'SMTP',
    },
    position: {
      x: 350,
      y: 11,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'parallel-group',
    measured: {
      width: 150,
      height: 40,
    },
    selected: false,
    dragging: false,
  },
  {
    id: 'sql',
    type: 'default',
    data: {
      label: 'SQL',
    },
    position: {
      x: 170,
      y: 60,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    parentId: 'parallel-group',
    measured: {
      width: 150,
      height: 40,
    },
    selected: false,
    dragging: false,
  },
  {
    id: 'http-sender',
    type: 'default',
    data: {
      label: 'HTTP Sender',
    },
    position: {
      x: 1120,
      y: 0,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    measured: {
      width: 150,
      height: 40,
    },
  },
];

export const edges: Edge[] = [
  {
    id: 'http-trigger-active-mq',
    source: 'http-trigger',
    target: 'active-mq',
  },
  {
    id: 'active-mq-parallel',
    source: 'active-mq',
    target: 'parallel',
  },
  {
    id: 'parallel-script',
    source: 'parallel',
    target: 'script',
  },
  {
    id: 'script-smtp',
    source: 'script',
    target: 'smtp',
  },
  {
    id: 'parallel-sql',
    source: 'parallel',
    target: 'sql',
  },
  {
    id: 'parallel-http-sender',
    source: 'parallel-group',
    target: 'http-sender',
  },
];
