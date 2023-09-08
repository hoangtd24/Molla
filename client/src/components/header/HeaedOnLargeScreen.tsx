import { useMutation, useQuery } from "@apollo/client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { LOGOUT_USER } from "../../graphql/mutation/User";
import { GET_CARTS } from "../../graphql/query/Cart";
import ActionIcon from "../actionIcon/ActionIcon";
import Button from "../button/Button";
import MinicartItem, {
  MinicartItemProps,
} from "../cartItem/MiniCartItem/MinicartItem";
import DropDownItem from "../dropdownItem/DropDownItem";
import MenuItem from "../menuItem/MenuItem";
import styles from "./Header.module.scss";
import { GET_CATEGORIES } from "../../graphql/query/Category";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";

const cx = classNames.bind(styles);

export interface Category {
  id: string;
  name: string;
}

const HeaderOnLargeScreen = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { isAuthenticated, logoutClient } = useAuth();
  const [fixHeader, setFixHeader] = useState<boolean>(false);
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
  });

  const { data: cartData } = useQuery(GET_CARTS);
  const { data: categoryData } = useQuery(GET_CATEGORIES);
  const { data: wishlistData } = useQuery(GET_WISHLISTS);

  const handleLogout = () => {
    logoutClient();
    logout();
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setFixHeader(window.scrollY > 185);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setFixHeader(window.scrollY > 185);
      });
    };
  }, []);

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
                <ActionIcon
                  icon={<AccountCircleOutlinedIcon />}
                  name="Account"
                  to="/login"
                />
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
                  onClickOutside={() => setVisible(false)}
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
                              <span>$500</span>
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
                        <span>No items in cart</span>
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
        <div className={cx(`${fixHeader ? "fixed" : ""}`)}>
          <Container>
            <Divider />
            <Grid container>
              <Grid item xs={3}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <Tippy
                    visible={visible}
                    interactive
                    placement={"bottom-start"}
                    offset={[0, 0]}
                    onClickOutside={() => setVisible(false)}
                    maxWidth={276}
                    render={(attrs) => (
                      <div className={cx("box")} tabIndex={1} {...attrs}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "calc((100vw - 48px)/4)",
                            maxWidth: "288px",
                          }}
                        >
                          {categoryData?.getCategories?.map(
                            (category: Category) => (
                              <Link
                                to={`/shop/${category.name}`}
                                key={category.id}
                                onClick={() => setVisible(false)}
                              >
                                {category.name}
                              </Link>
                            )
                          )}
                        </Box>
                      </div>
                    )}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        cursor: "pointer",
                        paddingX: "16px",
                      }}
                      width={"100%"}
                      height={"100%"}
                      onClick={() => setVisible(!visible)}
                      className={cx({ isActive: visible })}
                    >
                      {visible ? <CloseIcon /> : <MenuIcon />}
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#333",
                          fontFamily: "inherit",
                        }}
                      >
                        BROWSE CATEGORY
                      </Typography>
                    </Box>
                  </Tippy>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", margin: "0 16px" }}>
                  <MenuItem title="HOME" to="/" />
                  <MenuItem title="SHOP" to="/shop" />
                  <MenuItem title="PRODUCT" to="/product" />
                  <MenuItem title="PAGES" to="/pages" />
                  <MenuItem title="ELEMENTS" to="/elements" />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                    gap: "12px",
                  }}
                >
                  <WorkspacePremiumOutlinedIcon />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#777",
                      fontFamily: "inherit",
                    }}
                  >
                    Clearance Up to 30% Off
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Box>
    </header>
  );
};

export default HeaderOnLargeScreen;
