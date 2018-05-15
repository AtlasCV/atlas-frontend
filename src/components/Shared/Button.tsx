import * as React from "react";
import { style } from "typestyle";

interface Props {
  styles?: Object;
  disabled?: boolean;
  children: string;
  type?: string;
  onClick?(): void;
}

const buttonStyle = (styles?: Object) =>
  style(
    {
      backgroundColor: "#1db0ed",
      border: "none",
      color: "white",
      width: "150px",
      height: "40px",
      borderRadius: "2px",
      cursor: "pointer"
    },
    styles
  );

export default ({ children, type, onClick, styles, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={buttonStyle(styles)}
    >
      {children}
    </button>
  );
};
