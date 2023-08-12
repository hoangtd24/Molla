import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./DropDownItem.module.scss";

const cx = classNames.bind(styles);

interface DropDownProps {
  options: string[];
}
const DropDownItem = ({ options }: DropDownProps) => {
  return (
    <li className={cx("drop-down__item")}>
      <Link to="/">
        {options[0]}
        <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
      </Link>
      <ul className={cx("drop-down__options")}>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </li>
  );
};

export default DropDownItem;
