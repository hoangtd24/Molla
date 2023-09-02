import { Box, Container, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Checkout.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import { GET_CARTS } from "../../graphql/query/Cart";
import { useQuery } from "@apollo/client";
import { CartItemprops } from "../../components/cartItem/CartItem/CartItem";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { useState, useEffect } from "react";
import { ME } from "../../graphql/query/User";

const cx = classNames.bind(styles);
interface formValues {
  username: string;
  email: string;
  phone: string;
  address: string;
}
const Checkout = () => {
  const [showCupon, setShowCupon] = useState(false);
  const { data } = useQuery(GET_CARTS);
  const { data: meData, loading } = useQuery(ME);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm<formValues>({ defaultValues: meData?.me?.user });

  const handleCreateOrder = (data) => {
    console.log(data);
  };
  useEffect(() => {
    reset(meData?.me?.user);
  }, [meData, reset]);

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
          <div className={cx("cupon")}>
            <span>Have a cupon?</span>
            <span onClick={() => setShowCupon(!showCupon)}>
              Click here to enter your code
            </span>
          </div>
          <div className={cx("cupon-info__wrapper", { show: showCupon })}>
            <p>If you have a coupon code, please apply it below.</p>
            <div className={cx("cupon-info")}>
              <input placeholder="Cupon code" type="text" />
              <button>
                <ArrowRightAltRoundedIcon sx={{ fontSize: "18px" }} />
              </button>
            </div>
          </div>
          <Grid container spacing={3}>
            <Grid item md={8.4} xs={12}>
              <form>
                <h2>Billing Details</h2>
                <div className={cx("form-group")}>
                  <label htmlFor="username">Username *</label>
                  <input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                    type="text"
                    id="username"
                  />
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="email">Email *</label>
                  <input
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                    })}
                    type="email"
                    id="email"
                  />
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="phone">Phone *</label>
                  <input
                    {...register("phone", {
                      required: { value: true, message: "Phone is required" },
                    })}
                    type="text"
                    id="phone"
                  />
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="address">Address *</label>
                  <input
                    {...register("address", {
                      required: { value: true, message: "Address is required" },
                    })}
                    type="text"
                    id="address"
                  />
                </div>
              </form>
            </Grid>
            <Grid item md={3.6} xs={12}>
              {data && data.getCarts.success && (
                <div className={cx("summary-wrapper")}>
                  <h2>Your order</h2>
                  <table>
                    <thead>
                      <tr className={cx("tr")}>
                        <th className={cx("th")}>Product</th>
                        <th className={cx("th")}>SubTotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.getCarts.carts.map((cart: CartItemprops) => (
                        <tr key={cart.id} className={cx("tr")}>
                          <td className={cx("td")}>
                            <span>{cart.product.name}</span>
                            <strong>x{cart.qty}</strong>
                          </td>
                          <td className={cx("td")}>${cart.total}</td>
                        </tr>
                      ))}
                      <tr className={cx("tr")}>
                        <td className={cx("subtotal-header")}>Subtotal</td>
                        <td className={cx("subtotal-qty")}>
                          ${data.getCarts.total}
                        </td>
                      </tr>
                      <tr className={cx("tr")}>
                        <td className={cx("total-header")}>Total</td>
                        <td className={cx("total-qty")}>
                          ${data.getCarts.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={cx("payment-method")}>
                    <input type="radio" id="payment" />
                    <label htmlFor="payment">Cash on delivery</label>
                  </div>
                  <Button
                    title="PROCEED TO CHECKOUT"
                    theme="green"
                    onClick={handleSubmit(handleCreateOrder)}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Checkout;
