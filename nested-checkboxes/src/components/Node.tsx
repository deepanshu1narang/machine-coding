import type { NodeInterface } from "../types/types";
import Checkbox from "./Checkbox";
import "../styles/styles.css";
import { useState } from "react";

interface NodeProps {
  indeterminate?: boolean;
  id: number;
  label: string;
  checked: boolean;
  children: NodeInterface[];
  parentId: number | null;
}

const Node: React.FC<NodeProps> = ({ id, label, checked, indeterminate, children, parentId }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="node-layout">
      <div className="node-checkbox">
        {children.length > 0 ? (
          <button className={expanded ? "expanded" : ""} onClick={() => setExpanded(!expanded)}>
            {">"}
          </button>
        ) : (
          <div className="empty-space" />
        )}
        <Checkbox id={id} label={label} checked={checked} indeterminate={indeterminate as boolean} />
      </div>
      {expanded &&
        children.length > 0 &&
        children.map((node) => {
          const { id, label, parentId, checked, children } = node;
          let indeterminate = false;
          return <Node key={id} id={id} label={label} checked={checked} indeterminate={indeterminate} children={children} parentId={parentId} />;
        })}
    </div>
  );
};

export default Node;
