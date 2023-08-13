import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ActionIcon from "../actionIcon/ActionIcon";
import DropDownItem from "../dropdownItem/DropDownItem";
import MenuIcon from "@mui/icons-material/Menu";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import styles from "./Header.module.scss";
import MenuItem from "../menuItem/MenuItem";
import Tippy from "@tippyjs/react/headless";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../../graphql/mutation/User";

const cx = classNames.bind(styles);

const Header = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { isAuthenticated, logoutClient } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logout, _] = useMutation(LOGOUT_USER);
  const handleLogout = () => {
    logoutClient();
    logout();
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
                  />
                </div>
                <div className={cx("search-btn")}>
                  <SearchIcon />
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={cx("list-action_icon")}>
                <ActionIcon
                  icon={<AccountCircleOutlinedIcon />}
                  name="Account"
                />
                <ActionIcon
                  icon={<FavoriteBorderOutlinedIcon />}
                  name="Wishlist"
                  quantity={0}
                />
                <ActionIcon
                  icon={<ShoppingCartOutlinedIcon />}
                  name="Cart"
                  quantity={0}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
        <Box>
          <Container>
            <Divider />
            <Grid container>
              <Grid item xs={3}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    paddingX: "16px",
                    ":hover": {
                      backgroundColor: `var(--color-primary)`,
                    },
                  }}
                >
                  <Tippy
                    visible={visible}
                    interactive
                    placement={"bottom-start"}
                    offset={[-16, 0]}
                    onClickOutside={() => setVisible(false)}
                    render={(attrs) => (
                      <div className={cx("box")} tabIndex={1} {...attrs}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Link to="/">Furniture</Link>
                          <Link to="/">Sofas & Sleep Sofas</Link>
                          <Link to="/">Decor</Link>
                          <Link to="/">Lighting</Link>
                          <Link to="/">Beds</Link>
                          <Link to="/">Storage</Link>
                          <Link to="/">Kitchen cabinets</Link>
                          <Link to="/">Electronics</Link>
                          <Link to="/">Coffee & Tables</Link>
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
                      }}
                      width={"100%"}
                      height={"100%"}
                      onClick={() => setVisible(!visible)}
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
        </Box>
      </Box>
    </header>
  );
};

export default Header;
