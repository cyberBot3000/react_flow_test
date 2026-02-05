import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
//import { nodes as treeNodes } from './nodes-data-long';
//import { nodes as treeNodes } from './nodes-data-large-deep';
import { nodes as treeNodes } from './nodes-data-simple';
import { buildFlowFromTree } from './flow-utils';
import { useEffect } from 'react';
import { ResizableNode } from './ResizableNode';

const nodeTypes = {
  ResizableNode: ResizableNode,
};

const { nodes: initialNodes, edges: initialEdges } = buildFlowFromTree(treeNodes);

function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    console.log(
      'Nodes state:',
      nodes.map((n) => ({ name: n.data.label, x: n.position.x, y: n.position.y })),
      'Edges state:',
      edges
    );
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        panOnScroll
        panOnDrag={[1, 2]}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
