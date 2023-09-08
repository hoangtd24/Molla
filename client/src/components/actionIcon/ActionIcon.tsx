import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./ActionIcon.module.scss";
import { ReactElement } from "react";

const cx = classNames.bind(styles);

interface ActionIconProps {
  to: string;
  icon: ReactElement;
  name: string;
  quantity?: number;
}
const ActionIcon = ({ icon, name, quantity, to }: ActionIconProps) => {
  return (
    <div className={cx("action-item")}>
      <Link to={to}>
        <div className={cx("action-item__icon")}>{icon}</div>
        <span className={cx("action-item__title")}>{name}</span>
      </Link>
      {typeof quantity === "number" && (
        <div className={cx("action-item__quantity")}>{quantity}</div>
      )}
    </div>
  );
};

export default ActionIcon;
