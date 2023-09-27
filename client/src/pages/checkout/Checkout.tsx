import { useMutation, useQuery } from "@apollo/client";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { Box, Container, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { CartItemprops } from "../../components/cartItem/CartItem/CartItem";
import { CLEAR_CART } from "../../graphql/mutation/Cart";
import { CREATE_ORDER } from "../../graphql/mutation/Order";
import { GET_CARTS } from "../../graphql/query/Cart";
import { GET_PAYMENTS } from "../../graphql/query/Payment";
import { ME } from "../../graphql/query/User";
import styles from "./Checkout.module.scss";

const cx = classNames.bind(styles);
interface formValues {
  username: string;
  email: string;
  phone: string;
  address: string;
}

interface Payment {
  id: string;
  name: string;
  desc: string;
}
const Checkout = () => {
  const [showCupon, setShowCupon] = useState<boolean>(false);
  const [payment, setPayment] = useState<string | null>(null);
  const { data } = useQuery(GET_CARTS);
  const { data: meData } = useQuery(ME);
  const { data: paymentsData } = useQuery(GET_PAYMENTS);
  const [createOrder] = useMutation(CREATE_ORDER);
  const [deleteCarts] = useMutation(CLEAR_CART, {
    refetchQueries: [GET_CARTS],
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValues>({ defaultValues: meData?.me?.user });

  const handleCreateOrder = async (formData: formValues) => {
    const res = await createOrder({
      variables: {
        orderInput: {
          ...formData,
          cartId: data?.getCarts?.carts.map((cart: CartItemprops) =>
            Number(cart.id)
          ),
          total: data?.getCarts?.total,
          paymentId: payment
            ? Number(payment)
            : Number(paymentsData.getPayments[0].id),
        },
      },
    });
    if (res.data?.createOrder?.code === 200) {
      await deleteCarts({
        variables: {
          delCartsInput: {
            cartIds: data?.getCarts?.carts.map((cart: CartItemprops) =>
              Number(cart.id)
            ),
          },
        },
      });
      navigate(`/checkout/receive/${res.data?.createOrder?.order?.id}`);
    }
    console.log(res);
  };
  useEffect(() => {
    reset(meData?.me?.user);
  }, [meData, reset]);

  useEffect(() => {
    document.title = `Checkout - Molla Funiture`;
  }, []);
  return (
    <Box>
      <div className={cx("page-header")}>
        <h1 className={cx("header")}>Checkout</h1>
        <h2 className={cx("sub-header")}>Shop</h2>
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
                      pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
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
                {errors[Object.keys(errors)[0] as keyof formValues]
                  ?.message && (
                  <div className={cx("error")}>
                    <span className={cx("error-heading")}>Error:</span>
                    <span className={cx("error-title")}>
                      {
                        errors[Object.keys(errors)[0] as keyof formValues]
                          ?.message
                      }
                    </span>
                  </div>
                )}
                {errors.phone?.type === "pattern" && (
                  <div className={cx("error")}>
                    <span className={cx("error-heading")}>Error:</span>
                    <span className={cx("error-title")}>
                      Please enter phone number exactly
                    </span>
                  </div>
                )}
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
                  {paymentsData &&
                    paymentsData.getPayments.map((payment: Payment) => (
                      <div key={payment.id} style={{ marginBottom: "16px" }}>
                        <div className={cx("payment-method")}>
                          <input
                            type="radio"
                            id={payment.id}
                            name="payment"
                            defaultChecked={
                              payment.id === paymentsData.getPayments[0].id
                            }
                            onChange={() => setPayment(payment.id)}
                          />
                          <label htmlFor={payment.id}>{payment.name}</label>
                        </div>
                        <p className={cx("payment-desc")}>{payment.desc}</p>
                      </div>
                    ))}
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
