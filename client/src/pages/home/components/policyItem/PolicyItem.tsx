import classNames from "classnames/bind";
import { ReactElement } from "react";
import styles from "./PolicyItem.module.scss";
const cx = classNames.bind(styles);
interface PolicyItemProps {
  icon: ReactElement;
  heading: string;
  desc: string;
}
const PolicyItem = ({ desc, heading, icon }: PolicyItemProps) => {
  return (
    <div className={cx("policy-item")}>
      <div className={cx("policy-item__icon")}>{icon}</div>
      <div className={cx("policy-item_content")}>
        <p className={cx("policy-item__heading")}>{heading}</p>
        <p className={cx("policy-item__desc")}>{desc}</p>
      </div>
    </div>
  );
};

export default PolicyItem;
