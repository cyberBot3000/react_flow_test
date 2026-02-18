import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSmoothStepPath, type Edge, type EdgeProps } from '@xyflow/react';
import type { EdgeData } from '../types';
import { AddNode } from '../AddNode';
import { memo } from 'react';
import styles from './labeled-edge.module.scss';
import { useDnD } from '../../model/pallete/dnd/dnd-context';

export const LabeledEdge = memo(({ id, data, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }: EdgeProps<Edge<EdgeData>>) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { component } = useDnD();

  if (!data) {
    return null;
  }
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform:
              data.parentId && data.index === 0
                ? `translate(-85%, -50%) translate(${targetX}px,${targetY}px)`
                : `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className={styles.label}
        >
          {!!component && (
            <AddNode createNode={data?.addNode} index={data.index} branchIndex={data.branchIndex} parentId={data.parentId} append={false} />
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
});
