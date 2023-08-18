import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./DropDownItem.module.scss";

const cx = classNames.bind(styles);

type position = "top-left" | "top-right" | "bottom-left" | "bottom-right";
interface DropDownProps {
  options: string[];
  position?: position;
}
const DropDownItem = ({ options, position }: DropDownProps) => {
  return (
    <li className={cx("drop-down__item")}>
      <Link to="/">
        {options[0]}
        <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
      </Link>
      <ul className={cx("drop-down__options", `${position ? position : ""}`)}>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </li>
  );
};

export default DropDownItem;
