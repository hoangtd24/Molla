/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/material";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import styles from "./Receive.module.scss";
import { useQuery } from "@apollo/client";
import { GET_ORDER } from "../../graphql/query/Order";

const cx = classNames.bind(styles);

const Receive = () => {
  const param = useParams();
  const { data } = useQuery(GET_ORDER, {
    variables: {
      orderId: Number(param?.id),
    },
  });

  console.log(data);
  return (
    <Box>
      <div className={cx("page-header")}>
        <h2 className={cx("header")}>Checkout</h2>
        <h3 className={cx("sub-header")}>Shop</h3>
      </div>
      <Box>
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
      <Box>
        <Container>
          <div className={cx("receive-content")}>
            <p className={cx("receive-notice")}>
              Thank you. Your order has been received.
            </p>
            <ul className={cx("order-overview")}>
              <li className={cx("order-overview__item")}>
                <h2>ORDER NUMBER</h2>
                <p>{data?.getOrder?.id}</p>
              </li>
              <li className={cx("order-overview__item")}>
                <h2>DATE</h2>
                <p>September 3, 2023</p>
              </li>
              <li className={cx("order-overview__item")}>
                <h2>TOTAL</h2>
                <p>${data?.getOrder.total}</p>
              </li>
              <li className={cx("order-overview__item")}>
                <h2>PAYMENT METHOD:</h2>
                <p>{data?.getOrder?.payment?.name}</p>
              </li>
            </ul>
            <div className={cx("order-detail")}>
              <h2>Order details</h2>
              <table className={cx("table")}>
                <thead>
                  <tr className={cx("tr")}>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.getOrder?.carts?.map((cart) => (
                      <tr className={cx("tr")} key={cart.id}>
                        <td className={cx("td")}>
                          {cart.product.name} x <strong>{cart.qty}</strong>
                        </td>
                        <td className={cx("td")}>${cart.total}</td>
                      </tr>
                    ))}
                  <tr className={cx("tr")}>
                    <td className={cx("subtotal")}>SubTotal</td>
                    <td className={cx("subtotal")}>${data?.getOrder.total}</td>
                  </tr>
                  <tr className={cx("tr")}>
                    <td className={cx("payment-method")}>Payment Method</td>
                    <td className={cx("payment-method")}>
                      {data?.getOrder?.payment?.name}
                    </td>
                  </tr>
                  <tr className={cx("tr")}>
                    <td className={cx("total")}>Total</td>
                    <td className={cx("total")}>${data?.getOrder.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default Receive;
