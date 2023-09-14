import { Box, Divider, Grid, useMediaQuery } from "@mui/material";
import styles from "./ProductItemThrough.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ProductItemProps } from "./ProductItem";
import { useState } from "react";
import classNames from "classnames/bind";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../button/Button";
import { useMutation } from "@apollo/client";
import { CREATE_CART } from "../../graphql/mutation/Cart";
import { GET_CARTS } from "../../graphql/query/Cart";
import {
  CREATE_WISHLIST,
  REMOVE_WISHLIST_BY_PRODUCT_ID,
} from "../../graphql/mutation/Wishlist";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import { useAuth } from "../../context/UserContext";
import { useSnackBar } from "../../context/SnackBar";

const cx = classNames.bind(styles);

const ProductItemThrough = ({
  id,
  images,
  name,
  price,
  newPrice,
  inWishlist,
}: ProductItemProps) => {
  const [bgImage, setBgImage] = useState<string>(images[0]);
  const matches = useMediaQuery("(max-width:600px)");
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
    <Box>
      <Box sx={{ marginBottom: "16px" }}>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={6}>
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
          </Grid>
          <Grid
            item
            sm={5}
            xs={12}
            md={6}
            style={{ order: `${matches ? "2" : "unset"}` }}
          >
            <div className={cx("product-info")}>
              <Link
                to={`/detail-product/${id}`}
                aria-label={`detail product ${name}`}
              >
                <h3 className={cx("product-name")}>{name}</h3>
              </Link>
              <p className={cx("product-desc")}>
                Morbi purus libero, faucibus adipiscing, commodo quis, gravida
                id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed
                semper lorem at felis. Vestibulum volutpat, lacus a ultrices
                sagittis, mi neque euismod dui,
              </p>
            </div>
          </Grid>
          <Grid item sm={4} xs={6} md={3}>
            <div className={cx("product-list__actions")}>
              <div className={cx("product-price")}>
                {price === newPrice ? (
                  `$${price}`
                ) : (
                  <>
                    <span className={cx("product-price__new")}>
                      ${newPrice}
                    </span>
                    <span className={cx("product-price__old")}>${price}</span>
                  </>
                )}
              </div>
              <ul className={cx("product-action")}>
                <li className={cx("product-action__item")}>
                  <Link
                    to={`/detail-product/${id}`}
                    className={cx("quick-view")}
                    aria-label={`detail product ${name}`}
                  >
                    <span>
                      <VisibilityOutlinedIcon sx={{ fontSize: "20px" }} />
                    </span>
                    <span>quick view</span>
                  </Link>
                </li>
                {inWishlist ? (
                  <li
                    className={cx("product-action__item")}
                    onClick={() => handleRemoveProductFromWishlist(Number(id))}
                  >
                    <span>
                      <FavoriteIcon sx={{ fontSize: "20px" }} />
                    </span>
                    <span>wishlist</span>
                  </li>
                ) : (
                  <li
                    className={cx("product-action__item")}
                    onClick={() => handleAddToWishlist(Number(id))}
                  >
                    <span>
                      <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
                    </span>
                    <span>wishlist</span>
                  </li>
                )}
              </ul>
              <Button
                title="ADD TO CART"
                leftIcon={
                  <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                }
                onClick={() => handleAddToCart(Number(id))}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </Box>
  );
};

export default ProductItemThrough;
