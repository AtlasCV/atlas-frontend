import * as React from "react";
import "../../styles/input.css";

type InputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  error: boolean | string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.SyntheticEvent<HTMLInputElement>) => void;
};

export default ({
  label,
  name,
  type,
  value,
  handleChange,
  handleBlur,
  error
}: InputProps) => (
  <div className="text-box-container">
    <label htmlFor={name} className="text-box-label">
      {label} {error ? <span className="text-box-error">{error}</span> : ""}
    </label>
    <input
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      type={type}
      name={name}
      className="text-box"
    />
  </div>
);
