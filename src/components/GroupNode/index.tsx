import { Handle, Position, type NodeProps } from '@xyflow/react';

import styles from './GroupNode.module.css';
import { memo } from 'react';
import type { GroupNodeData } from '../types';
import { AddNode } from '../AddNode';
import { useDnD } from '../../model/pallete/dnd/dnd-context';

interface GroupNodeProps extends NodeProps {
  data: GroupNodeData;
}

export const GroupNode = memo(({ data, width, height, id }: GroupNodeProps) => {
  const { component } = useDnD();
  return (
    <div className={styles.groupNode} style={{ width, height }}>
      <div className={styles.childrenWrapper}>
        <div className={styles.groupNodeRoot}>
          <Handle type="target" position={Position.Left} id="outer-target" className={styles.outerTargetHandle} />
          <div className={styles.groupNodeRootContent}>
            <div className={styles.groupNodeHeader}>{data.name}</div>
            <button className={styles.groupNodeDeleteButton} onClick={() => data.delete(id)}>
              x
            </button>
          </div>
          <div className={styles.groupNodeRootActions}>
            <button className={styles.groupNodeRootActionButton} onClick={() => data.collapse(id, !data.isCollapsed)}>
              ⌄
            </button>
            {!data.isCollapsed && (
              <button className={styles.groupNodeRootActionButton} onClick={() => data.addEmptyNode(id, -1, 0, true)}>
                +
              </button>
            )}
          </div>
          <Handle type="source" position={Position.Right} id="inner-source" className={styles.innerSourceHandle} />
        </div>
        <Handle type="source" position={Position.Right} id="outer-source" className={styles.outerSourceHandle} />
      </div>
      {!!component && data.index === data.branchLength - 1 && (
        <div className={styles.addNodeContinaer}>
          <AddNode createNode={data.addNode} index={data.index} branchIndex={data.branchIndex} parentId={data.parentId} />
        </div>
      )}
    </div>
  );
});
