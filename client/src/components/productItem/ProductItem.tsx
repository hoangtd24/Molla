import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";
import { addToCart } from "../../utils/cart";
const cx = classNames.bind(styles);
export interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  images: string[];
  discount: {
    discount_percent: number;
  } | null;
}
const ProductItem = ({
  id,
  name,
  price,
  images,
  discount,
}: ProductItemProps) => {
  const [bgImage, setBgImage] = useState<string>(images[0]);
  return (
    <div className={cx("product-wrapper")}>
      <Link
        to={`/detail-product/${id}`}
        onMouseOver={() => setBgImage(images[1])}
        onMouseLeave={() => setBgImage(images[0])}
      >
        <div
          className={cx("product-img")}
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
      </Link>
      <div className={cx("product-actions")}>
        <span>
          <FavoriteBorderIcon sx={{ fontSize: "16px" }} />
        </span>
        <span>
          <Link to={`/detail-product/${id}`}>
            <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
          </Link>
        </span>
      </div>
      <div className={cx("product-content")}>
        <Link to={`/detail-product/${id}`} className={cx("product-name")}>
          {name}
        </Link>
        <div className={cx("product-price")}>
          <span className={cx("product-price__new")}>${price}</span>
          {discount && (
            <span className={cx("product-price__old")}>
              ${price - (price * discount.discount_percent) / 100}
            </span>
          )}
        </div>
        <button className={cx("add_btn")} onClick={() => addToCart(id)}>
          <span className={cx("icon")}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: "16px" }} />
          </span>
          <span className={cx("title")}>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
