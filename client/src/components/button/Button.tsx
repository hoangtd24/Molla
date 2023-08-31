import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";
import React from "react";
const cx = classNames.bind(styles);
type buttonComp =
  | React.ForwardRefExoticComponent<
      LinkProps & React.RefAttributes<HTMLAnchorElement>
    >
  | "button"
  | "a";
type buttonSize = "xs" | "sm" | "md" | "lg";
type buttonTheme = "black" | "normal" | "green";
interface btnProps {
  to?: string;
  href?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onClick?: () => void;
  size?: buttonSize;
  theme?: buttonTheme;
  title?: string;
}
const Button = ({
  leftIcon,
  rightIcon,
  onClick,
  size = "md",
  theme = "normal",
  to,
  href,
  title,
}: btnProps) => {
  let Comp: buttonComp = "button";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: { [key: string]: any } = {
    onClick,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  const classes = cx("btn", `${size}`, `${theme}`);
  return (
    <Comp to={""} className={classes} {...props}>
      {leftIcon && <span className={cx("btn-icon")}>{leftIcon}</span>}
      <span className={cx("btn-title")}>{title}</span>
      {rightIcon && <span className={cx("btn-icon")}>{rightIcon}</span>}
    </Comp>
  );
};

export default Button;
