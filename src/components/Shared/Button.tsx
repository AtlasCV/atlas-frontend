import * as React from "react";
import { style } from "typestyle";

interface Props {
  styles?: Object;
  disabled?: boolean;
  children: string;
  type?: string;
  id?: string;
  name?: string;
  onClick?(e: React.SyntheticEvent<HTMLButtonElement>): void;
}

const buttonStyle = (styles?: Object) =>
  style(
    {
      backgroundColor: "#fff",
      border: "1px solid #28719d",
      color: "#28719d",
      width: "150px",
      height: "40px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px"
    },
    styles
  );

export default ({
  children,
  type,
  styles,
  disabled,
  id,
  name,
  onClick
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={buttonStyle(styles)}
      id={id}
      name={name}
    >
      {children}
    </button>
  );
};
