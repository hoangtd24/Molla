import { useQuery } from "@apollo/client";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import WishlisItem, {
  WishlistItemProps,
} from "../../components/wishlistItem/Wishlist";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import styles from "./Wishlist.module.scss";

const cx = classNames.bind(styles);

const Wishlist = () => {
  const { data } = useQuery(GET_WISHLISTS);

  return (
    <Box>
      <div className={cx("page-header")}>
        <h2 className={cx("header")}>Wishlist</h2>
        <h3 className={cx("sub-header")}>Shop</h3>
      </div>
      <Box sx={{ borderBottom: "1px solid #ebebeb", paddingBottom: "60px" }}>
        <Container>
          <div className={cx("breadcrumbs")}>
            <Link to="/">Home</Link>
            <span>{">"}</span>
            <Link to={"/shop/all"}>Shop</Link>
            <span>{">"}</span>
            <span>Wishlist</span>
          </div>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data && data.getWishlists.length > 0 ? (
                data.getWishlists?.map((wishlist: WishlistItemProps) => (
                  <WishlisItem key={wishlist.id} {...wishlist} />
                ))
              ) : (
                <tr className={cx("wish-list__empty")}>
                  <td>No products added to the wishlist</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={cx("product-social")}>
            <span>Share:</span>
            <div>
              <span className={cx("product-social__icon")}>
                <FacebookRoundedIcon sx={{ fontSize: "16px" }} />
              </span>
              <span className={cx("product-social__icon")}>
                <TwitterIcon sx={{ fontSize: "16px" }} />
              </span>
              <span className={cx("product-social__icon")}>
                <PinterestIcon sx={{ fontSize: "16px" }} />
              </span>
              <span className={cx("product-social__icon")}>
                <LinkedInIcon sx={{ fontSize: "16px" }} />
              </span>
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default Wishlist;
