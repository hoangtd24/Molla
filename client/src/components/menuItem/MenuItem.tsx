import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

interface DropDownProps {
  title: string;
  to: string;
}
const MenuItem = ({ title, to }: DropDownProps) => {
  return (
    <li className={cx("drop-down__item")}>
      <NavLink
        to={to}
        className={({ isActive }) => cx({ active: isActive })}
        end
      >
        {title}
        <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
      </NavLink>
    </li>
  );
};

export default MenuItem;
