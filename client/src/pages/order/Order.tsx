import { Box, Container } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import OrderItem, {
  OrderItemProps,
} from "../../components/orderItem/OrderItem";
import styles from "./Order.module.scss";
import { useQuery } from "@apollo/client";
import { PAGINATED_ORDER } from "../../graphql/query/Order";
import Button from "../../components/button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const cx = classNames.bind(styles);

const Order = () => {
  const { data, loading, fetchMore } = useQuery(PAGINATED_ORDER, {
    variables: {
      limit: 4,
    },
  });
  return (
    <Box>
      <div className={cx("page-header")}>
        <h2 className={cx("header")}>Order</h2>
        <h3 className={cx("sub-header")}>Your orders</h3>
      </div>
      <Box sx={{ borderBottom: "1px solid #ebebeb" }}>
        <Container>
          <div className={cx("breadcrumbs")}>
            <Link to="/">Home</Link>
            <span>{">"}</span>
            <span>Your orders</span>
          </div>
        </Container>
      </Box>
      <Box>
        <Container>
          <div className={cx("content")}>
            <h1 className={cx("order-heading")}>Your order</h1>
            <div className={cx("list-order")}>
              {data?.orders?.paginatedOrders?.length > 0
                ? data.orders.paginatedOrders.map((order: OrderItemProps) => (
                    <OrderItem key={order.id} {...order} />
                  ))
                : !loading && (
                    <div className={cx("empty-order")}>
                      <p>You don't have any orders yet</p>
                      <Button
                        title="Shop now"
                        size="lg"
                        fitContent
                        to="/shop/all"
                      />
                    </div>
                  )}
            </div>
            {data?.orders?.hasMore && !loading && (
              <div className={cx("load-more")}>
                <Button
                  title="Load More"
                  rightIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
                  onClick={() =>
                    fetchMore({
                      variables: {
                        limit: 4,
                        cursor: data?.orders?.cursor,
                      },
                    })
                  }
                />
              </div>
            )}
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default Order;
