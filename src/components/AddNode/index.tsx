import { useDnD } from '../../model/pallete/dnd/dnd-context';
import type { Node } from '../../nodes.interfaces';
import styles from './AddNode.module.css';
import { memo } from 'react';
interface AddNodeProps {
  createNode: (node: Node, parentId: string | undefined, branchIndex: number | undefined, index: number) => void;
  parentId?: string;
  branchIndex?: number;
  index: number;
}

export const AddNode = memo(({ createNode, parentId, branchIndex, index }: AddNodeProps) => {
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
      createNode(
        {
          id: Date.now().toString(),
          ...(component.component.type === 'group' ? { type: 'group', children: [] } : { type: 'default' }),
          name: component.name,
        },
        parentId,
        branchIndex,
        index + 1,
      );
      setComponent(null);
    }
  };
  return (
    <div className={styles.addNode} onDrop={onDrop} onDragOver={handleOnDragOver}>
      +
    </div>
  );
});
