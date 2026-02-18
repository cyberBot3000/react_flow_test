import React from 'react';

import styles from './pallete-item.module.scss';
import type { ComponentDTO } from '../../types';
import { createGhostElement } from './create-ghost-element';

interface PaletteItemProps {
  onDragEndAction: () => void;
  onDragStartAction: (event: React.DragEvent<HTMLDivElement>, dto: ComponentDTO) => void;
  item: ComponentDTO;
}

export const PaletteItem = ({ onDragEndAction, onDragStartAction, item }: PaletteItemProps) => {

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStartAction(event, item);

    const ghost = createGhostElement(item);
    document.body.appendChild(ghost);
    const xOffset = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const yOffset = event.clientY - event.currentTarget.getBoundingClientRect().top;
    event.dataTransfer.setDragImage(ghost, xOffset, yOffset);

    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  return (
    <div>
      <div
        className={styles.component}
        onDragEnd={onDragEndAction}
        onDragStart={handleDragStart}
        draggable={true}
      >
        <div className={styles.component_info}>
          <div className={styles.component_title}>{item.name}</div>
        </div>
      </div>
    </div>
  );
};
