import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ReactElement } from "react";

const cx = classNames.bind(styles);
interface btnProps {
  title: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onClick: () => void;
  type?: "submit" | "reset" | "button";
  large?: boolean;
  small?: boolean;
  black?: boolean;
  green?: boolean;
}
const Button = ({
  title,
  leftIcon,
  rightIcon,
  onClick,
  type,
  large,
  small,
  black,
  green,
}: btnProps) => {
  return (
    <button
      className={cx("btn", { large }, { small }, { black }, { green })}
      onClick={onClick}
      type={type}
    >
      {leftIcon && <span className={cx("btn-icon")}>{leftIcon}</span>}
      <span className={cx("btn-title")}>{title}</span>
      {rightIcon && <span className={cx("btn-icon")}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
