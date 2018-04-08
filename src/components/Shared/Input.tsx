import * as React from "react";
import "../../styles/input.css";

export default ({ label, id }: { label: string; id: string }) => (
  <div className="text-box-container">
    <label htmlFor={id} className="text-box-label">
      {label}
    </label>
    <input id={id} className="text-box" type="text" />
  </div>
);
