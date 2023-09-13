import { useMutation } from "@apollo/client";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { DELETE_CART } from "../../../graphql/mutation/Cart";
import { GET_CARTS } from "../../../graphql/query/Cart";
import styles from "./MiniCartItem.module.scss";
const cx = classNames.bind(styles);
export interface MinicartItemProps {
  id: number;
  product: {
    id: string;
    name: string;
    newPrice: number;
    images: string[];
  };
  qty: number;
}
const MinicartItem = ({ id, product, qty }: MinicartItemProps) => {
  const [delCart] = useMutation(DELETE_CART, { refetchQueries: [GET_CARTS] });
  return (
    <div className={cx("mini-cart__wrap")}>
      <div className={cx("mini-cart__right")}>
        <h4 className={cx("product-title")}>
          <Link to={`/detail-product/${product.id}`}>
            <span>{product.name}</span>
          </Link>
        </h4>
        <div className={cx("product-info")}>
          <span className={cx("product-info__quantity")}>{qty} x</span>
          <span className={cx("product-info__price")}>${product.newPrice}</span>
        </div>
      </div>
      <div className={cx("mini-cart__left")}>
        <img
          src={product.images[0]}
          alt="product-img"
          className={cx("product-img")}
          loading="lazy"
        />
      </div>
      <span
        className={cx("clear")}
        onClick={() => {
          delCart({ variables: { cartId: Number(id) } });
        }}
      >
        x
      </span>
    </div>
  );
};

export default MinicartItem;
