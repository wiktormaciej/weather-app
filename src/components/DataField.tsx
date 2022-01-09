import { ReactElement } from "react";
import "./DataField.css";

export function DataField({
  label,
  value,
}: {
  label: string;
  value: string;
}): ReactElement {
  return (
    <div className="data-field">
      <h6 className="data-label">{label}</h6>
      <span className="data-value">{value}</span>
    </div>
  );
}
