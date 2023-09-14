import { useMutation, useQuery } from "@apollo/client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Container, Grid, Typography } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { client } from "../../api/apolloClient";
import { useAuth } from "../../context/UserContext";
import { LOGOUT_USER } from "../../graphql/mutation/User";
import { GET_CARTS } from "../../graphql/query/Cart";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import ActionIcon from "../actionIcon/ActionIcon";
import Button from "../button/Button";
import MinicartItem, {
  MinicartItemProps,
} from "../cartItem/MiniCartItem/MinicartItem";
import DropDownItem from "../dropdownItem/DropDownItem";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

export interface Category {
  id: string;
  name: string;
}

const HeaderOnLargeScreen = () => {
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);
  const { isAuthenticated, logoutClient } = useAuth();
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logout, _] = useMutation(LOGOUT_USER, {
    update(cache) {
      cache.modify({
        fields: {
          me() {
            return null;
          },
        },
      });
    },
    refetchQueries: [GET_CARTS, GET_WISHLISTS],
  });

  const { data: cartData } = useQuery(GET_CARTS);
  const { data: wishlistData } = useQuery(GET_WISHLISTS);

  const handleLogout = () => {
    logoutClient();
    logout();
    client.cache.reset();
  };
  return (
    <header className={cx("header")}>
      <Box>
        <Box sx={{ backgroundColor: "#f8f8f8" }}>
          <Container
            sx={{
              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ fontSize: "15px", fontFamily: "inherit", color: "#999" }}
            >
              Special collection already available.
            </Typography>
            <Link to="/" className={cx("read-more")}>
              Read more ...
            </Link>

            <div className={cx("nav-dropdown")}>
              <DropDownItem options={["USD", "VND"]} />
              <DropDownItem options={["English", "Spanish", "VietNam"]} />
              {isAuthenticated ? (
                <Link
                  to="/login"
                  className={cx("signIn-link")}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <Link to="/login" className={cx("signIn-link")}>
                  Sign in / Sign up
                </Link>
              )}
            </div>
          </Container>
        </Box>
        <Container
          sx={{
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className={cx("header-main__left")}>
                <Typography variant="h1">
                  <Link to="/" className={cx("logo")}>
                    <img
                      src="../../../src/assets/images/retina_logo.png"
                      alt="logo"
                    />
                  </Link>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={cx("search-wrapper")}>
                <div className={cx("search-box")}>
                  <input
                    type="text"
                    placeholder="Search product ..."
                    required
                    ref={searchRef}
                  />
                </div>
                <div
                  className={cx("search-btn")}
                  onClick={() =>
                    navigate({
                      pathname: "/search",
                      search: `?${createSearchParams({
                        keyword: `${searchRef.current?.value}`,
                      })}`,
                    })
                  }
                >
                  <SearchIcon />
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={cx("list-action_icon")}>
                {isAuthenticated ? (
                  <Tippy
                    visible={visibleUserMenu}
                    interactive
                    onClickOutside={() => setVisibleUserMenu(false)}
                    placement={"bottom-start"}
                    maxWidth={300}
                    render={(attrs) => (
                      <div className={cx("user-box")} tabIndex={1} {...attrs}>
                        <Link
                          to="/myorders"
                          onClick={() => setVisibleUserMenu(false)}
                        >
                          My orders
                        </Link>
                        <Link to="/login" onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    )}
                  >
                    <div onClick={() => setVisibleUserMenu(!visibleUserMenu)}>
                      <ActionIcon
                        icon={<AccountCircleOutlinedIcon />}
                        name="Account"
                      />
                    </div>
                  </Tippy>
                ) : (
                  <ActionIcon
                    icon={<AccountCircleOutlinedIcon />}
                    name="Account"
                    to="/login"
                  />
                )}
                <ActionIcon
                  icon={<FavoriteBorderOutlinedIcon />}
                  name="Wishlist"
                  quantity={
                    wishlistData?.getWishlists?.length > 0
                      ? wishlistData?.getWishlists?.length
                      : 0
                  }
                  to="/wishlist"
                />
                <Tippy
                  interactive
                  placement={"bottom-end"}
                  offset={[0, 0]}
                  maxWidth={300}
                  render={(attrs) => (
                    <div className={cx("cart-box")} tabIndex={1} {...attrs}>
                      {cartData && cartData?.getCarts?.carts?.length ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "300px",
                            padding: "12px 16px 12px 30px",
                            transition: "all 0.5s linear",
                          }}
                        >
                          <div className={cx("cart-content")}>
                            {cartData.getCarts.carts.map(
                              (product: MinicartItemProps) => (
                                <MinicartItem key={product.id} {...product} />
                              )
                            )}
                          </div>
                          <div className={cx("cart-info")}>
                            <div className={cx("cart-total__price")}>
                              <span>SUBTOTAL</span>
                              <span>${cartData?.getCarts?.total}</span>
                            </div>
                            <div className={cx("cart-action")}>
                              <Button
                                title="View cart"
                                to="/cart"
                                size="sm"
                                theme="green"
                              />
                              <Button
                                title="Check out"
                                to="/checkout"
                                size="sm"
                                rightIcon={
                                  <ArrowRightAltIcon
                                    sx={{ fontSize: "16px" }}
                                  />
                                }
                              />
                            </div>
                          </div>
                        </Box>
                      ) : (
                        <span className={cx("cart-empty")}>
                          No items in cart
                        </span>
                      )}
                    </div>
                  )}
                >
                  <Box>
                    <ActionIcon
                      to="/cart"
                      icon={<ShoppingCartOutlinedIcon />}
                      name="Cart"
                      quantity={
                        cartData?.getCarts?.carts?.length > 0
                          ? cartData.getCarts.carts.length
                          : 0
                      }
                    />
                  </Box>
                </Tippy>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </header>
  );
};

export default HeaderOnLargeScreen;
