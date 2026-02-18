import { Handle, Position, type NodeProps } from '@xyflow/react';
import styles from './EmptyNode.module.css';
import { memo } from 'react';
import type { DefaultNodeData } from '../types';
import { useDnD } from '../../model/pallete/dnd/dnd-context';

interface EmptyNodeProps extends NodeProps {
  data: DefaultNodeData;
}

export const EmptyNode = memo(({ data, width, height, id }: EmptyNodeProps) => {
  const { component, setComponent } = useDnD();
  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (component) {
      data.delete(id);
      data.addNode(
        {
          id: Date.now().toString(),
          ...(component.component.type === 'group' ? { type: 'group', children: [] } : { type: 'default' }),
          name: component.name,
        },
        data.parentId,
        data.branchIndex,
        data.index
      );
      setComponent(null);
    }
  };
  return (
    <div
      style={{ width, height, ...(component ? { borderColor: 'blue' } : {}) }}
      className={styles.node}
      onDragOver={handleOnDragOver}
      onDrop={onDrop}
    >
      <Handle type="target" position={Position.Left} id="outer-target" />
      <Handle type="source" position={Position.Right} id="outer-source" />
    </div>
  );
});
