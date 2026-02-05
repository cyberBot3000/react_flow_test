import { Handle, Position, NodeResizer } from '@xyflow/react';
import { memo } from 'react';

export const ResizableNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
});
