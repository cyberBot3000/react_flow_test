import type { ComponentDTO } from '../../types';
import { useDnD } from '../dnd/dnd-context';
import { PaletteItem } from '../pallete-item';
import styles from './panel.module.css';

const data: ComponentDTO[] = [
  { component: { name: 'http sender', type: 'default' }, id: 1, name: 'http sender' },
  { component: { name: 'parallel', type: 'group' }, id: 2, name: 'parallel' },
];

export const Pallete = () => {
  const { setComponent } = useDnD();
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: ComponentDTO) => {
    setComponent?.(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const oneDragEnd = () => {
    setComponent?.(null);
  };
  
  return (
    <div className={styles.panel}>
      {data.map((component) => (
        <PaletteItem item={component} onDragEndAction={oneDragEnd} onDragStartAction={onDragStart} />
      ))}
    </div>
  );
};
