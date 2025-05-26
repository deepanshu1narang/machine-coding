import { useEffect, useRef } from "react";
import type { CheckboxInterface } from "../types/types";
import "../styles/styles.css";

const Checkbox: React.FC<CheckboxInterface> = ({ id, label, checked, indeterminate, onChange }) => {
  const checkboxRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (!checked) checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className="checkbox">
      <input ref={checkboxRef} type="checkbox" id={id.toString()} name={label} checked={checked} onChange={(e) => onChange && onChange(e)} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
