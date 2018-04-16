import * as React from "react";
import "../../styles/input.css";

type SelectProps = {
  label: string;
  name: string;
  value: string;
  error: boolean | string;
  children: React.ReactNode;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBlur: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
};

export default ({
  label,
  name,
  children,
  value,
  handleChange,
  handleBlur,
  error
}: SelectProps) => (
  <div className="text-box-container">
    <label htmlFor={name} className="text-box-label">
      {label}
    </label>
    <select
      value={value}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      className="text-box"
    >
      {children}
    </select>
  </div>
);
