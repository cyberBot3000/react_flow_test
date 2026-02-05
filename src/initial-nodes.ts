import { type Node as FlowNode, type Edge, Position } from '@xyflow/react';

export const nodes: FlowNode[] = [
  {
    id: 'f84ff063-da3e-42d2-8176-1eb3beec6d5b',
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
    zIndex: 0,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: '6196b76b-58ba-4d3f-a34e-835c5c1723db',
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
    zIndex: 0,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'b5c6f02f-0506-4bee-887d-6f42649c384e',
    type: 'default',
    data: {
      label: 'Parallel',
    },
    position: {
      x: 500,
      y: 0,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    zIndex: 1,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'e84ac89c-9fbc-4d5d-8a97-6968d8ff1592',
    type: 'default',
    data: {
      label: 'Script',
    },
    position: {
      x: 715,
      y: -110,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group',
    zIndex: 1,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'cf600a18-316a-4fdd-a067-29b73d2dfea9',
    type: 'default',
    data: {
      label: 'Nested Parallel',
    },
    position: {
      x: 965,
      y: -110,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group',
    zIndex: 2,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'nested-1',
    type: 'default',
    data: {
      label: 'SMTP',
    },
    position: {
      x: 1180,
      y: -155,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'cf600a18-316a-4fdd-a067-29b73d2dfea9-group',
    zIndex: 2,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'nested-2',
    type: 'default',
    data: {
      label: 'Logger',
    },
    position: {
      x: 1430,
      y: -155,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'cf600a18-316a-4fdd-a067-29b73d2dfea9-group',
    zIndex: 2,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'nested-3',
    type: 'default',
    data: {
      label: 'Cache',
    },
    position: {
      x: 1180,
      y: -65,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'cf600a18-316a-4fdd-a067-29b73d2dfea9-group',
    zIndex: 2,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'cf600a18-316a-4fdd-a067-29b73d2dfea9-group',
    zIndex: 1,
    data: {
      label: '',
    },
    position: {
      x: 1040,
      y: -175,
    },
    type: 'input',
    sourcePosition: Position.Right,
    parentId: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group',
    style: {
      backgroundColor: 'rgba(255, 0, 255, 0.2)',
      height: 170,
      width: 590,
    },
    measured: {
      width: 590,
      height: 170,
    },
  },
  {
    id: '941c1e1c-a1fb-4cca-b271-2db2e6bd1eb5',
    type: 'default',
    data: {
      label: 'SQL',
    },
    position: {
      x: 715,
      y: 110,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentId: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group',
    zIndex: 1,
    measured: {
      width: 150,
      height: 40,
    },
  },
  {
    id: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group',
    zIndex: 0,
    data: {
      label: '',
    },
    position: {
      x: 575,
      y: -130,
    },
    type: 'input',
    sourcePosition: Position.Right,
    style: {
      backgroundColor: 'rgba(255, 0, 255, 0.2)',
      height: 300,
      width: 2070,
    },
    measured: {
      width: 2070,
      height: 300,
    },
  },
  {
    id: '4e913273-f09e-4ee4-81bf-9d5907236e00',
    type: 'default',
    data: {
      label: 'HTTP Sender',
    },
    position: {
      x: 2745,
      y: 0,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    zIndex: 0,
    measured: {
      width: 150,
      height: 40,
    },
  },
];

export const edges: Edge[] = [
  {
    id: 'f84ff063-da3e-42d2-8176-1eb3beec6d5b-6196b76b-58ba-4d3f-a34e-835c5c1723db',
    source: 'f84ff063-da3e-42d2-8176-1eb3beec6d5b',
    target: '6196b76b-58ba-4d3f-a34e-835c5c1723db',
  },
  {
    id: 'e84ac89c-9fbc-4d5d-8a97-6968d8ff1592-cf600a18-316a-4fdd-a067-29b73d2dfea9',
    source: 'e84ac89c-9fbc-4d5d-8a97-6968d8ff1592',
    target: 'cf600a18-316a-4fdd-a067-29b73d2dfea9',
  },
  {
    id: 'b5c6f02f-0506-4bee-887d-6f42649c384e-e84ac89c-9fbc-4d5d-8a97-6968d8ff1592',
    source: 'b5c6f02f-0506-4bee-887d-6f42649c384e',
    target: 'e84ac89c-9fbc-4d5d-8a97-6968d8ff1592',
  },
  {
    id: 'b5c6f02f-0506-4bee-887d-6f42649c384e-941c1e1c-a1fb-4cca-b271-2db2e6bd1eb5',
    source: 'b5c6f02f-0506-4bee-887d-6f42649c384e',
    target: '941c1e1c-a1fb-4cca-b271-2db2e6bd1eb5',
  },
  {
    id: '6196b76b-58ba-4d3f-a34e-835c5c1723db-b5c6f02f-0506-4bee-887d-6f42649c384e',
    source: '6196b76b-58ba-4d3f-a34e-835c5c1723db',
    target: 'b5c6f02f-0506-4bee-887d-6f42649c384e',
  },
  {
    id: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group-4e913273-f09e-4ee4-81bf-9d5907236e00',
    source: 'b5c6f02f-0506-4bee-887d-6f42649c384e-group',
    target: '4e913273-f09e-4ee4-81bf-9d5907236e00',
  },
];
