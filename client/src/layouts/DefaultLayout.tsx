import classNames from "classnames/bind";
import Footer from "../components/footer/Footer";
import HeaderOnLargeScreen from "../components/header/HeaedOnLargeScreen";
import styles from "./DefaultLayput.module.scss";
import HeaderOnSmallScreen from "../components/header/HeaderOnSmallScreen";
import useMediaQuery from "@mui/material/useMediaQuery";

const cx = classNames.bind(styles);
interface Props {
  children: JSX.Element;
}
const DefaultLayout = ({ children }: Props) => {
  const matches = useMediaQuery("(max-width:900px)");
  return (
    <div className={cx("wrapper")}>
      {matches ? <HeaderOnSmallScreen /> : <HeaderOnLargeScreen />}
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
