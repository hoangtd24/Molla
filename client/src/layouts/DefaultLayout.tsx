import classNames from "classnames/bind";
import Footer from "../components/footer/Footer";
import HeaderOnLargeScreen from "../components/header/HeaderOnLargeScreen";
import styles from "./DefaultLayput.module.scss";
import HeaderOnSmallScreen from "../components/header/HeaderOnSmallScreen";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavigateBar from "../components/navigateBar/NavigateBar";

const cx = classNames.bind(styles);
interface Props {
  children: JSX.Element;
}
const DefaultLayout = ({ children }: Props) => {
  const matches = useMediaQuery("(max-width:901px)");
  return (
    <div className={cx("wrapper")}>
      {matches ? (
        <HeaderOnSmallScreen />
      ) : (
        <>
          <HeaderOnLargeScreen />
          <NavigateBar />
        </>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
