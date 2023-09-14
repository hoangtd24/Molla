import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import styles from "./Wishlist.module.scss";
import { useMutation } from "@apollo/client";
import { REMOVE_WISHLIST } from "../../graphql/mutation/Wishlist";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import { CREATE_CART } from "../../graphql/mutation/Cart";
import { GET_CARTS } from "../../graphql/query/Cart";

const cx = classNames.bind(styles);

export interface WishlistItemProps {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    newPrice: number;
    images: string[];
  };
}
const WishlisItem = ({ id, product }: WishlistItemProps) => {
  const [removeWishlist] = useMutation(REMOVE_WISHLIST, {
    refetchQueries: [GET_WISHLISTS],
  });

  const [createCart] = useMutation(CREATE_CART, {
    refetchQueries: [GET_CARTS],
  });

  //fn handle add to cart

  const handleAddToCart = async (productId: number, wishlistId: number) => {
    await createCart({
      variables: {
        cartInput: {
          productId,
          quantity: 1,
        },
      },
    });
    await removeWishlist({
      variables: {
        wishlistId: wishlistId,
      },
    });
  };
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
      <td className={cx("product-status")}>In stock</td>
      <td className={cx("product-add")}>
        <Button
          title="ADD TO CART"
          size="lg"
          onClick={() => handleAddToCart(Number(product.id), Number(id))}
        />
        <span
          className={cx("product-clear")}
          onClick={() =>
            removeWishlist({
              variables: {
                wishlistId: Number(id),
              },
            })
          }
        >
          x
        </span>
      </td>
    </tr>
  );
};

export default WishlisItem;
