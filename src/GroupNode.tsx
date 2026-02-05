import { Handle, Position, type NodeProps } from '@xyflow/react';

type GroupNodeProps = NodeProps & {
  data: {
    label: string
  }
}

export const GroupNode = ({ data,  }: GroupNodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          left: '-8px',
          background: '#6366f1',
          width: '12px',
          height: '12px',
        }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: '-8px',
          background: '#6366f1',
          width: '12px',
          height: '12px',
        }}
      />
    </>
  );
};
