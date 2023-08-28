import { useMutation } from "@apollo/client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { CREATE_CART } from "../../graphql/mutation/Cart";
import { GET_CARTS } from "../../graphql/query/Cart";
import styles from "./ProductItem.module.scss";
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

  const [createCart] = useMutation(CREATE_CART, {
    refetchQueries: [GET_CARTS],
  });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (id: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    createCart({
      variables: {
        cartInput: {
          productId: Number(id),
          quantity: 1,
        },
      },
    });
  };
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
        <button
          className={cx("add_btn")}
          onClick={() => handleAddToCart(Number(id))}
        >
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
