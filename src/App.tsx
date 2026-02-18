import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
//import { nodes as treeNodes } from './nodes-data-long';
//import { nodes as treeNodes } from './nodes-data-large-deep';
//import { nodes as treeNodes } from './nodes-data-simple';
import { buildFlowFromTree } from './flow-utils';
import { useCallback, useEffect, useState } from 'react';
import { ResizableNode } from './ResizableNode';
import { GroupNode } from './components/GroupNode';
import NodeInspector from './components/NodeInspector';
import { DefaultNode } from './components/DefaultNode';
import { useNodesModel } from './model/useNodesModel';
import { EmptyNode } from './components/EmptyNode';
import { Pallete } from './model/pallete/panel';
import { DnDProvider } from './model/pallete/dnd/dnd-provider';
import styles from './app.module.scss';
import { LabeledEdge } from './components/labeled-edge';

const nodeTypes = {
  ResizableNode: ResizableNode,
  GroupNode: GroupNode,
  DefaultNode: DefaultNode,
  EmptyNode: EmptyNode,
};

const edgesTypes = {
  LabeledEdge: LabeledEdge,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const { nodes: treeNodes, deleteNode, addNode, addEmptyNode } = useNodesModel();

  // useEffect(() => {
  //   console.log(
  //     'Nodes state:',
  //     nodes.map((n) => ({ name: n.data.name, x: n.position.x, y: n.position.y, width: n.measured?.width, height: n.measured?.height })),
  //     'Edges state:',
  //     edges
  //   );
  // }, [nodes, edges]);

  const handleNodeCollapse = useCallback((id: string, isCollapsed: boolean) => {
    setCollapsedNodes((prevCollapsedNodes) => ({
      ...prevCollapsedNodes,
      [id]: isCollapsed,
    }));
  }, []);

  useEffect(() => {
    const { nodes: updatedNodes, edges: updatedEdges } = buildFlowFromTree(treeNodes, {
      handleNodeCollapse,
      collapsedNodes,
      deleteNode,
      addNode,
      addEmptyNode,
    });
    console.log('updatedNodes', updatedNodes);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [collapsedNodes, handleNodeCollapse, setNodes, setEdges, treeNodes, deleteNode, addNode, addEmptyNode]);

  return (
    <DnDProvider>
      <div className={styles.app}>
        <div className={styles.aside}>
          <Pallete />
        </div>
        <div className={styles.main}>
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
            edgeTypes={edgesTypes}
            panOnScroll
            panOnDrag={[1, 2]}
          >
            <Background />
            <Controls />
            <MiniMap />
            {/* <NodeInspector /> */}
          </ReactFlow>
        </div>
      </div>
    </DnDProvider>
  );
}

export default App;
