import { Box, Divider, Grid, useMediaQuery } from "@mui/material";
import styles from "./ProductItemThrough.module.scss";
import { Link } from "react-router-dom";
import { ProductItemProps } from "./ProductItem";
import { useState } from "react";
import classNames from "classnames/bind";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../button/Button";

const cx = classNames.bind(styles);

const ProductItemThrough = ({
  id,
  images,
  name,
  price,
  newPrice,
}: ProductItemProps) => {
  const [bgImage, setBgImage] = useState<string>(images[0]);
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      <Box sx={{ marginBottom: "16px" }}>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={6}>
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
          </Grid>
          <Grid
            item
            sm={5}
            xs={12}
            md={6}
            style={{ order: `${matches ? "2" : "unset"}` }}
          >
            <div className={cx("product-info")}>
              <h3 className={cx("product-name")}>{name}</h3>
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
                    <span className={cx("product-price__new")}>${price}</span>
                    <span className={cx("product-price__old")}>
                      ${newPrice}
                    </span>
                  </>
                )}
              </div>
              <ul className={cx("product-action")}>
                <li className={cx("product-action__item")}>
                  <span>
                    <VisibilityOutlinedIcon sx={{ fontSize: "20px" }} />
                  </span>
                  <span>quick view</span>
                </li>
                <li className={cx("product-action__item")}>
                  <span>
                    <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
                  </span>
                  <span>wishlist</span>
                </li>
              </ul>
              <Button
                title="ADD TO CART"
                leftIcon={
                  <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                }
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
