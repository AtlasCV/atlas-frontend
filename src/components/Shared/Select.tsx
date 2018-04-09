import * as React from "react";
import "../../styles/input.css";

export default ({
  label,
  name,
  children,
  value
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  value: string;
}) => (
  <div className="text-box-container">
    <label htmlFor={name} className="text-box-label">
      {label}
    </label>
    <select value={value} name={name} className="text-box">
      {children}
    </select>
  </div>
);
