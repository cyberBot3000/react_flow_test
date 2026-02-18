import { Handle, Position, type NodeProps } from '@xyflow/react';
import styles from './DefaultNode.module.css';
import { memo } from 'react';
import type { DefaultNodeData } from '../types';
import { AddNode } from '../AddNode';

interface DefaultNodeProps extends NodeProps {
  data: DefaultNodeData;
}

export const DefaultNode = memo(({ data, width, height, id }: DefaultNodeProps) => {
  return (
    <div style={{ width, height }} className={styles.node}>
      <Handle type="target" position={Position.Left} id="outer-target" />
      <div className={styles.nodeContent}>
        <div className={styles.nodeHeader}>{data.name}</div>
        <div className={styles.nodeFooter}>{data.component?.name}</div>
        <button className={styles.nodeDeleteButton} onClick={() => data.delete(id)}>x</button>
      </div>
      <Handle type="source" position={Position.Right} id="outer-source" />
      <div className={styles.addNodeContinaer}>
        <AddNode onAddNode={() => data.addEmptyNode(data.parentId, data.branchIndex, data.index + 1, false)} />
      </div>
    </div>
  );
});
