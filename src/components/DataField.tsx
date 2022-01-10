import { ReactElement } from "react";
import "./DataField.css";

interface DataFieldProps {
  label: string;
  value: string;
}

export function DataField({ label, value }: DataFieldProps): ReactElement {
  return (
    <div className="data-field">
      <h6 className="data-label">{label}</h6>
      <span className="data-value">{value}</span>
    </div>
  );
}
