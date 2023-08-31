import { Box, Container, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Checkout.module.scss";

const cx = classNames.bind(styles);

const Checkout = () => {
  return (
    <Box>
      <div className={cx("page-header")}>
        <h2 className={cx("header")}>Checkout</h2>
        <h3 className={cx("sub-header")}>Shop</h3>
      </div>
      <Box sx={{ borderBottom: "1px solid #ebebeb" }}>
        <Container>
          <div className={cx("breadcrumbs")}>
            <Link to="/">Home</Link>
            <span>{">"}</span>
            <Link to="/shop/all">Shop</Link>
            <span>{">"}</span>
            <span>Checkout</span>
          </div>
        </Container>
      </Box>
      <Box sx={{ borderBottom: "1px solid #ebebeb", paddingBottom: "60px" }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item md={8.4} xs={12}></Grid>
            <Grid item md={3.6} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Checkout;
