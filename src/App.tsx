import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState, type NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodes as initialNodes, edges as initialEdges } from './initial-nodes';
import { useEffect, useCallback } from 'react';
import { ResizableNode } from './ResizableNode';

const nodeTypes = {
  ResizableNode: ResizableNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    console.log('Nodes state:', nodes);
  }, [nodes]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        //nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
