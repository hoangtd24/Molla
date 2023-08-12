import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { styleNavHeader } from "../../styles";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <Box>
        <Container maxWidth="lg">
          <Box>
            <Grid container>
              <Grid item md={6} xs={12} sx={{ marginBottom: "20px" }}>
                <img
                  src="../../../src/assets/images/retina_logo.png"
                  alt="logo"
                  className={cx("logo")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#999",
                    fontSize: "15px",
                    fontFamily: "Jost",
                    marginTop: "12px",
                  }}
                >
                  Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                  augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                  Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                  luctus, metus.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "30px",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                        fontFamily: "Jost",
                        padding: "10px 10px 10px 0",
                      }}
                    >
                      Got Question? Call us 24/7
                    </Typography>
                    <Link to="/" className={cx("phone")}>
                      +0123 456 789
                    </Link>
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                        fontFamily: "Jost",
                        padding: "10px 10px 10px 0",
                      }}
                    >
                      Payment Method
                    </Typography>
                    <img
                      src="../../../src/assets/images/payments.png"
                      alt="logo"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4} md={2}>
                <Box>
                  <Typography variant="h3" style={styleNavHeader}>
                    Infomation
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          About Molla
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          How to shop on Molla
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Contact us
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Login
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          FAQ
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={4} md={2}>
                <Box>
                  <Typography variant="h3" style={styleNavHeader}>
                    Customer Service
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Payment Methods
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Money-back guarantee!
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Returns
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Shoping
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Terms and conditions
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Privacy Policy
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={4} md={2}>
                <Box>
                  <Typography variant="h3" style={styleNavHeader}>
                    My Account
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Sign In
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          View Cart
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          My Wishlist
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Track My Order
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        <Link to="/" className={cx("menu-item__link")}>
                          Help
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
