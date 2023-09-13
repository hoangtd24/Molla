import { useMutation, useQuery } from "@apollo/client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Accordion,
  AccordionSummary,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { LOGOUT_USER } from "../../graphql/mutation/User";
import { GET_CARTS } from "../../graphql/query/Cart";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import ActionIcon from "../actionIcon/ActionIcon";
import DropDownItem from "../dropdownItem/DropDownItem";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const HeaderOnSmallScreen = () => {
  const tabStyle = {
    fontSize: "13px",
    textTransform: "none",
    fontWeight: "600",
    fontFamily: "Jost",
    flex: 1,
  };
  const AccordionStyle = {
    fontSize: "12px",
    color: "#666",
    fontFamily: "Jost",
  };
  const [visibleLink, setVisibleLink] = useState<boolean>(false);
  const { isAuthenticated, logoutClient } = useAuth();
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logout, _] = useMutation(LOGOUT_USER);
  const handleLogout = () => {
    logoutClient();
    logout();
  };
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const { data: cartData } = useQuery(GET_CARTS);
  const { data: wishlistData } = useQuery(GET_WISHLISTS);
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
            <Tippy
              visible={visibleLink}
              interactive
              placement={"bottom-end"}
              onClickOutside={() => setVisibleLink(false)}
              render={(attrs) => (
                <div className={cx("box")} tabIndex={1} {...attrs}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <DropDownItem
                      options={["USD", "VND"]}
                      position="bottom-left"
                    />
                    <DropDownItem
                      options={["English", "Spanish", "VietNam"]}
                      position="bottom-left"
                    />
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
                  </Box>
                </div>
              )}
            >
              <button
                className={cx("top-link")}
                onClick={() => setVisibleLink(!visibleLink)}
              >
                Links <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
              </button>
            </Tippy>
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
          <div className={cx("header-main__left")}>
            {(["left"] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <span
                  onClick={toggleDrawer(anchor, true)}
                  className={cx("menu_icon")}
                >
                  <MenuIcon />
                </span>
                <Drawer
                  anchor={"left"}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  <Box width={280}>
                    <Box sx={{ padding: "24px 16px" }}>
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
                    </Box>
                    <Box
                      sx={{
                        borderColor: "divider",
                        display: "flex",
                        justifyContent: "center",
                        color: "#333",
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="inherit"
                        indicatorColor="primary"
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "var(--color-primary)",
                          },
                        }}
                        sx={{ width: "100%" }}
                      >
                        <Tab label="Main Menu" sx={tabStyle} />
                        <Tab label="Categories" sx={tabStyle} />
                      </Tabs>
                    </Box>
                    {value === 0 ? (
                      <Box>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography sx={AccordionStyle}>HOME</Typography>
                          </AccordionSummary>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography sx={AccordionStyle}>SHOP</Typography>
                          </AccordionSummary>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                            }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography sx={AccordionStyle}>PRODUCT</Typography>
                          </AccordionSummary>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                            }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography sx={AccordionStyle}>PAGES</Typography>
                          </AccordionSummary>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                            }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography sx={AccordionStyle}>
                              ELEMENTS
                            </Typography>
                          </AccordionSummary>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                            }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography sx={AccordionStyle}>
                              BUY MOLLA!
                            </Typography>
                          </AccordionSummary>
                        </Accordion>
                      </Box>
                    ) : (
                      <div className={cx("box")}>
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
                  </Box>
                </Drawer>
              </React.Fragment>
            ))}
            <Typography variant="h1">
              <Link to="/" className={cx("logo")}>
                <img
                  src="../../../src/assets/images/retina_logo.png"
                  alt="logo"
                />
              </Link>
            </Typography>
          </div>
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
            <ActionIcon
              icon={<ShoppingCartOutlinedIcon />}
              name="Cart"
              quantity={
                cartData?.getCarts?.carts?.length > 0
                  ? cartData.getCarts.carts.length
                  : 0
              }
              to="/cart"
            />
          </div>
        </Container>
      </Box>
    </header>
  );
};

export default HeaderOnSmallScreen;
