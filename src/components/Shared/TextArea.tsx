import * as React from "react";
import "../../styles/input.css";

type InputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  error: boolean | string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  height?: string;
};

export default ({
  label,
  name,
  type,
  value,
  handleChange,
  handleBlur,
  error,
  height
}: InputProps) => (
  <div className="text-box-container">
    <label htmlFor={name} className="text-box-label">
      {label} {error ? <span className="text-box-error">{error}</span> : ""}
    </label>
    <textarea
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      name={name}
      className="text-box"
      style={{ height, paddingTop: "25px" }}
    />
  </div>
);
