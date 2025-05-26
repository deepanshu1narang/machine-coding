import type { NodeInterface } from "../types/types";
import Node from "./Node";
import "../styles/styles.css";

interface BoxProps {
  nodes: NodeInterface[];
}

const Box: React.FC<BoxProps> = ({ nodes }) => {
  return (
    <div>
      <fieldset>
        <legend>Choose the required options</legend>
        <div>
          {nodes.map((node) => {
            const { id, label, parentId, checked, children } = node;
            let indeterminate = false;
            return <Node key={id} id={id} label={label} checked={checked} indeterminate={indeterminate} children={children} parentId={parentId} />;
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default Box;
