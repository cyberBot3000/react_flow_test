import dagre from 'dagre'
import { type Node as FlowNode, type Edge, Position } from '@xyflow/react'
import type { Node } from './nodes-data'

const NODE_WIDTH = 172
const NODE_HEIGHT = 36

type ProcessedData = {
  nodes: FlowNode[]
  edges: Edge[]
}

export const processNodesData = (nodesData: Node[]): ProcessedData => {
  const flowNodes: FlowNode[] = []
  const flowEdges: Edge[] = []
  const dagreGraph = new dagre.graphlib.Graph()

  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: 'LR' })

  const processNode = (
    node: Node,
    parentId: string | null = null,
    level: number = 0
  ) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
    
    flowNodes.push({
      id: node.id,
      type: 'default',
      data: { label: node.name },
      position: { x: 0, y: 0 },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      draggable: false,
    })

    if (parentId) {
      const edgeId = `${parentId}-${node.id}`
      flowEdges.push({
        id: edgeId,
        source: parentId,
        target: node.id,
      })
      dagreGraph.setEdge(parentId, node.id)
    }

    if (node.children.length > 0) {
      node.children.forEach((childrenGroup) => {
        childrenGroup.forEach((child, index) => {
          if (index === 0) {
            processNode(child, node.id, level + 1)
          } else {
            const previousChild = childrenGroup[index - 1]
            processNode(child, previousChild.id, level + 1)
          }
        })
      })
    }
  }

  nodesData.forEach((node, index) => {
    if (index === 0) {
      processNode(node)
    } else {
      const previousNode = nodesData[index - 1]
      processNode(node, previousNode.id)
    }
  })

  dagre.layout(dagreGraph)

  flowNodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    }
  })

  return { nodes: flowNodes, edges: flowEdges }
}
