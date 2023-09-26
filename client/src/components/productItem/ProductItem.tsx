import { useMutation } from "@apollo/client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackBar } from "../../context/SnackBar";
import { useAuth } from "../../context/UserContext";
import { CREATE_CART } from "../../graphql/mutation/Cart";
import {
  CREATE_WISHLIST,
  REMOVE_WISHLIST_BY_PRODUCT_ID,
} from "../../graphql/mutation/Wishlist";
import { GET_CARTS } from "../../graphql/query/Cart";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import styles from "./ProductItem.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
const cx = classNames.bind(styles);
export interface ProductItemProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  newPrice: number;
  averageRating?: number;
  inWishlist: boolean;
}
const ProductItem = ({
  id,
  name,
  price,
  images,
  newPrice,
  averageRating,
  inWishlist,
}: ProductItemProps) => {
  const [bgImage, setBgImage] = useState<string>(images[0]);

  //mutation create cart
  const [createCart] = useMutation(CREATE_CART, {
    refetchQueries: [GET_CARTS],
  });

  //mutation create wishlist
  const [createWishlist] = useMutation(CREATE_WISHLIST, {
    refetchQueries: [GET_WISHLISTS],
  });

  const [removeWishlistByProductId] = useMutation(
    REMOVE_WISHLIST_BY_PRODUCT_ID,
    { refetchQueries: [GET_WISHLISTS] }
  );
  const { isAuthenticated } = useAuth();
  const { setOpenSnackBar, setMessageSnackBar } = useSnackBar();

  const navigate = useNavigate();

  // function handle add to cart
  const handleAddToCart = async (id: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const res = await createCart({
      variables: {
        cartInput: {
          productId: Number(id),
          quantity: 1,
        },
      },
    });
    if (res.data?.createCart?.success) {
      setOpenSnackBar(true);
      setMessageSnackBar("Add to cart successfully");
    }
  };

  // FN add to wish list
  const handleAddToWishlist = async (id: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const res = await createWishlist({
      variables: {
        productId: Number(id),
      },
    });
    if (res.data?.createWishlist?.success) {
      setOpenSnackBar(true);
      setMessageSnackBar("Added product to wishlist");
    }
  };

  //Fn remove item from wishlist

  const handleRemoveProductFromWishlist = async (id: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const res = await removeWishlistByProductId({
      variables: {
        productId: Number(id),
      },
    });
    if (res.data?.removeWishlistByProductId?.success) {
      setOpenSnackBar(true);
      setMessageSnackBar("Product removed from wishlist");
    }
  };

  return (
    <div className={cx("product-wrapper")}>
      <Link
        to={`/detail-product/${id}`}
        onMouseOver={() => setBgImage(images[1])}
        onMouseLeave={() => setBgImage(images[0])}
        aria-label={`detail product ${name}`}
      >
        <div
          className={cx("product-img")}
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
      </Link>
      <div className={cx("product-actions")}>
        {inWishlist ? (
          <span
            onClick={() => handleRemoveProductFromWishlist(Number(id))}
            className={cx({
              active: inWishlist,
            })}
          >
            <FavoriteIcon sx={{ fontSize: "16px" }} />
          </span>
        ) : (
          <span onClick={() => handleAddToWishlist(Number(id))}>
            <FavoriteBorderIcon sx={{ fontSize: "16px" }} />
          </span>
        )}
        <span>
          <Link
            to={`/detail-product/${id}`}
            aria-label={`detail product ${name}`}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
          </Link>
        </span>
      </div>
      <div className={cx("product-content")}>
        <Link
          to={`/detail-product/${id}`}
          className={cx("product-name")}
          aria-label={`detail product ${name}`}
        >
          {name}
        </Link>
        <div className={cx("product-price")}>
          {price === newPrice ? (
            `$${price}`
          ) : (
            <>
              <span className={cx("product-price__old")}>${newPrice}</span>
              <span className={cx("product-price__new")}>${price}</span>
            </>
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
      <div className={cx("lable")}>
        {price !== newPrice && <div className={cx("sale-lable")}>SALE</div>}
        {averageRating && averageRating > 4 ? (
          <div className={cx("top-lable")}>TOP</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
