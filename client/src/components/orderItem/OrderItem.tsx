import classNames from "classnames/bind";
import styles from "./OrderItem.module.scss";
import Button from "../button/Button";

const cx = classNames.bind(styles);
export interface OrderItemProps {
  id: string;
  createdAt: string;
  carts: {
    product: {
      name: string;
      newPrice: number;
    };
  }[];
  total: number;
}
const OrderItem = ({ id, createdAt, carts, total }: OrderItemProps) => {
  return (
    <div className={cx("order-wrapper")}>
      <div className={cx("order-info")}>
        <p className={cx("order-name")}>
          1. ML{id} {createdAt}
        </p>
        <p className={cx("order-product")}>
          {carts[0]?.product?.name}{" "}
          {carts.length > 1 ? `... and ${carts.length - 1} product` : ""}
        </p>
      </div>
      <div className={cx("order-status")}>
        <div className={cx("order-payment")}>
          <span className={cx("order-subtotal")}>
            Subtotal:<strong> ${total}</strong>
          </span>
          <span className={cx("order-total")}>
            Total: <strong>${total}</strong>
          </span>
        </div>
        <p className={cx("order-status__info")}>
          Order status: <span>On processing</span>
        </p>
      </div>
      <Button title="See details" to={`/checkout/receive/${id}`} fitContent />
    </div>
  );
};

export default OrderItem;
