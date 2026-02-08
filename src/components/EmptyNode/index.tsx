import { Handle, Position, type NodeProps } from "@xyflow/react";
import styles from "./EmptyNode.module.css";

interface EmptyNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

export const EmptyNode = ({ data, width, height }: EmptyNodeProps) => {
  return (
    <div style={{ width, height }} className={styles.node}>
      <Handle type="target" position={Position.Left} id="outer-target" />
      <div className={styles.nodeContent}>
        <div className={styles.nodeHeader}>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} id="outer-source" />
    </div>
  );
};
