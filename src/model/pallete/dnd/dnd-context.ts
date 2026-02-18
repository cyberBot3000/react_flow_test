import { createContext, useContext } from 'react';

import { type DnDContextValue } from '../../types';

export const DnDContext = createContext<DnDContextValue>({
  component: null,
  setComponent: () => {},

  draggingNodeId: null,
  setDraggingNodeId: () => {},

  hoverTarget: null,
  setHoverTarget: () => {},
});

export const useDnD = () => useContext(DnDContext);
