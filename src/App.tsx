import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
//import { nodes as treeNodes } from './nodes-data-long';
//import { nodes as treeNodes } from './nodes-data-large-deep';
import { nodes as treeNodes } from './nodes-data-simple';
import { buildFlowFromTree } from './flow-utils';
import { useCallback, useEffect, useState } from 'react';
import { ResizableNode } from './ResizableNode';
import { GroupNode } from './components/GroupNode';
import NodeInspector from './components/NodeInspector';
import { DefaultNode } from './components/DefaultNode';

const nodeTypes = {
  ResizableNode: ResizableNode,
  GroupNode: GroupNode,
  DefaultNode: DefaultNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log(
      'Nodes state:',
      nodes.map((n) => ({ name: n.data.label, x: n.position.x, y: n.position.y })),
      'Edges state:',
      edges
    );
  }, [nodes, edges]);

  const handleNodeCollapse = useCallback((id: string, isCollapsed: boolean) => {
    console.log('handleNodeCollapse', id, isCollapsed);
    setCollapsedNodes((prevCollapsedNodes) => ({
      ...prevCollapsedNodes,
      [id]: isCollapsed,
    }));
  }, []);

  useEffect(() => {
    const { nodes: updatedNodes, edges: updatedEdges } = buildFlowFromTree(treeNodes, { handleNodeCollapse, collapsedNodes });
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [collapsedNodes, handleNodeCollapse, setNodes, setEdges]);

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
        panOnScroll
        panOnDrag={[1, 2]}
      >
        <Background />
        <Controls />
        <MiniMap />
        {/* <NodeInspector /> */}
      </ReactFlow>
    </div>
  );
}

export default App;
