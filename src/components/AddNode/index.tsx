import { useDnD } from '../../model/pallete/dnd/dnd-context';
import { type AddNode as AddNodeType } from '../../model/types';
import styles from './AddNode.module.css';
import { memo } from 'react';
interface AddNodeProps {
  createNode: AddNodeType;
  parentId?: string;
  branchIndex?: number;
  index: number;
  append?: boolean;
}

export const AddNode = memo(({ createNode, parentId, branchIndex, index, append=true }: AddNodeProps) => {
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
        append ? index + 1 : index,
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
