import { useQuery } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import classNames from "classnames/bind";
import Button from "../../components/button/Button";
import CartItem, {
  CartItemprops,
} from "../../components/cartItem/CartItem/CartItem";
import { GET_CARTS } from "../../graphql/query/Cart";
import styles from "./Cart.module.scss";

const cx = classNames.bind(styles);

const Cart = () => {
  const { data, loading } = useQuery(GET_CARTS);
  return (
    <Box>
      <div className={cx("page-header")}>
        <h2 className={cx("header")}>Shopping Cart</h2>
        <h3 className={cx("sub-header")}>Shop</h3>
      </div>
      <Box>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8.4}>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.getCarts?.carts?.map((cart: CartItemprops) => (
                      <CartItem key={cart.id} {...cart} />
                    ))}
                </tbody>
              </table>
            </Grid>
            <Grid item xs={12} md={3.6}>
              <div className={cx("summary-wrapper")}>
                <h2>Cart totals</h2>
                <div className={cx("cart-subtotal")}>
                  <span>SubTotal</span>
                  <span>{data && data.getCarts?.total}</span>
                </div>
                <div className={cx("cart-total")}>
                  <span>SubTotal</span>
                  <span>{data && data.getCarts?.total}</span>
                </div>
                <Button title="PROCEED TO CHECKOUT" theme="green" />
                {loading && <p>loading...</p>}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Cart;
