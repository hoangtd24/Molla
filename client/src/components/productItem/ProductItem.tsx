import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const cx = classNames.bind(styles);
const ProductItem = () => {
  return (
    <div className={cx("product-wrapper")}>
      <Link to="/">
        <div
          className={cx("product-img")}
          style={{
            backgroundImage: `url("https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/03/product-1-3.jpg")`,
          }}
        ></div>
      </Link>
      <div className={cx("product-content")}>
        <span className={cx("product-name")}>2-Seater</span>
        <div className={cx("product-price")}>
          <span className={cx("product-price__new")}>$93</span>
          <span className={cx("product-price__old")}>$95</span>
        </div>
        <button className={cx("add_btn")}>
          <span className={cx("icon")}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: "16px" }} />
          </span>
          <span className={cx("title")}>Add to cart</span>
        </button>
      </div>
      <div className={cx("product-actions")}>
        <span>
          <FavoriteBorderIcon sx={{ fontSize: "16px" }} />
        </span>
        <span>
          <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
