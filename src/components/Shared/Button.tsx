import * as React from "react";
import { style } from "typestyle";

const buttonStyle = style({
  backgroundColor: "#1db0ed",
  border: "none",
  color: "white",
  width: "150px",
  height: "40px",
  borderRadius: "2px",
  cursor: "pointer"
});

interface Props {
  children: string;
  type?: string;
  onClick?(): void;
}

export default ({ children, type, onClick }: Props) => {
  return (
    <button onClick={onClick} type={type} className={buttonStyle}>
      {children}
    </button>
  );
};
