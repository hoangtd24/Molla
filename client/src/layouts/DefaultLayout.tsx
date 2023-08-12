import classNames from "classnames/bind";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import styles from "./DefaultLayput.module.scss";

const cx = classNames.bind(styles);
interface Props {
  children: JSX.Element;
}
const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
