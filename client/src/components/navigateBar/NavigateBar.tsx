import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import MenuItem from "../menuItem/MenuItem";
import styles from "./NavigateBar.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/query/Category";
import { Category } from "../header/HeaderOnLargeScreen";

const cx = classNames.bind(styles);

const NavigateBar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [fixHeader, setFixHeader] = useState<boolean>(false);
  const { data: categoryData } = useQuery(GET_CATEGORIES);
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
    <div className={cx("sticky-header", { fixHeader })}>
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
                            className={cx("bar-item")}
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
                  <p className={cx("category-sum")}>BROWSE CATEGORY</p>
                </Box>
              </Tippy>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <ul style={{ display: "flex", margin: "0 16px" }}>
              <MenuItem title="HOME" to="/" />
              <MenuItem title="SHOP" to="/shop/all" />
              <MenuItem title="PRODUCT" to="/product" />
              <MenuItem title="PAGES" to="/pages" />
              <MenuItem title="ELEMENTS" to="/elements" />
            </ul>
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
  );
};

export default NavigateBar;
