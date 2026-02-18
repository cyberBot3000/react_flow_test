import { type ReactNode, useMemo, useState } from 'react';

import { DnDContext } from './dnd-context';
import type { ComponentDTO, DnDContextValue, HoverTarget } from '../../types';

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [component, setComponent] = useState<ComponentDTO | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [hoverTarget, setHoverTarget] = useState<HoverTarget>(null);

  const value: DnDContextValue = useMemo(
    () => ({
      component,
      setComponent,
      draggingNodeId,
      setDraggingNodeId,
      hoverTarget,
      setHoverTarget,
    }),
    [component, draggingNodeId, hoverTarget]
  );

  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
};
