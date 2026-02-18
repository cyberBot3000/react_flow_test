import styles from './AddNode.module.css';
import { memo } from 'react';
interface AddNodeProps {
  onAddNode: () => void;
}

export const AddNode = memo(({ onAddNode }: AddNodeProps) => {
  const addNode = () => {
    console.log('addNode');
    onAddNode();
  }
  return (
    <div className={styles.addNode} onClick={addNode}>
      +
    </div>
  );
});
