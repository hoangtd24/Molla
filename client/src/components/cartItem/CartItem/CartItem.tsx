import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./CartItem.module.scss";
import { useLayoutEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CART, UPDATE_CART } from "../../../graphql/mutation/Cart";
import { GET_CARTS } from "../../../graphql/query/Cart";

const cx = classNames.bind(styles);

export interface CartItemprops {
  id: number;
  product: {
    id: number;
    name: string;
    newPrice: number;
    images: string[];
  };
  qty: number;
  total: number;
}
const CartItem = ({ id, product, qty, total }: CartItemprops) => {
  const [quantity, setQuantity] = useState<number>(qty);

  const [updateCart] = useMutation(UPDATE_CART, {
    refetchQueries: [GET_CARTS],
  });

  const [delCart] = useMutation(DELETE_CART, { refetchQueries: [GET_CARTS] });

  const increaseQuantity = async (productId: number) => {
    setQuantity((prev) => prev + 1);
    updateCart({
      variables: {
        productId: productId,
        quantity: quantity + 1,
      },
    });
  };

  const decreaseQuantity = async (productId: number) => {
    setQuantity((prev) => prev - 1);
    if (quantity - 1 <= 0) {
      return;
    }
    updateCart({
      variables: {
        productId: productId,
        quantity: quantity - 1,
      },
    });
  };

  useLayoutEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
    }
  }, [quantity]);

  return (
    <tr className={cx("tr")}>
      <td className={cx("td")}>
        <Link
          to={`/detail-product/${product.id}`}
          aria-label={`detail product ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt="product_img"
            className={cx("product-img")}
          />
        </Link>
      </td>
      <td className={cx("td")}>
        <Link
          to={`/detail-product/${product.id}`}
          className={cx("product-name")}
          aria-label={`detail product ${product.name}`}
        >
          {product.name}
        </Link>
      </td>
      <td className={cx("product-price")}>${product.newPrice}</td>
      <td className={cx("td")}>
        <div className={cx("product-qty__actions")}>
          <span
            className={cx("product-qty__icons")}
            onClick={() => decreaseQuantity(Number(product.id))}
          >
            <RemoveOutlinedIcon sx={{ fontSize: "16px" }} />
          </span>
          <span>{quantity}</span>
          <span
            className={cx("product-qty__icons")}
            onClick={() => increaseQuantity(Number(product.id))}
          >
            <AddOutlinedIcon sx={{ fontSize: "16px" }} />
          </span>
        </div>
      </td>
      <td className={cx("product-total__price")}>${total}</td>
      <td
        className={cx("product-clear")}
        onClick={() => delCart({ variables: { cartId: Number(id) } })}
      >
        x
      </td>
    </tr>
  );
};

export default CartItem;
