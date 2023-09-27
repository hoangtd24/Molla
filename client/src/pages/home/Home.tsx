import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Box,
  Container,
  Divider,
  Grid,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import styles from "./Home.module.scss";

import { useQuery } from "@apollo/client";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { images } from "../../assets/images";
import BlogItem from "../../components/blogItem/BlogItem";
import ProductItem, {
  ProductItemProps,
} from "../../components/productItem/ProductItem";
import { brands, sketelonData } from "../../data";
import { GET_PRODUCTS } from "../../graphql/query/Product";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import { includeWislist } from "../../utils/includeWishlst";
import BannerItem from "./components/banner/BannerItem";
import DealBanner from "./components/banner/DealBanner";
import PolicyItem from "./components/policyItem/PolicyItem";
import ProductTabs from "./components/productTabs/ProductTabs";
import QuickView from "../../components/quickview/QuickView";

const cx = classNames.bind(styles);
const Home = () => {
  useEffect(() => {
    document.title = `Molla Funiture`;
  }, []);
  const [category, setCategory] = useState<number | null>(null);
  const matches = useMediaQuery("(max-width:900px)");

  //get product query
  const { data, loading: productsLoading } = useQuery(GET_PRODUCTS, {
    variables: {
      skip: 0,
      category: category,
    },
  });

  //getWishlist
  const { data: wishlistData } = useQuery(GET_WISHLISTS);
  return (
    <Box>
      <Slider />
      <Box sx={{ backgroundColor: "#fff" }}>
        <Swiper
          slidesPerView={4}
          pagination={{ clickable: true }}
          style={{ maxHeight: "500px" }}
          breakpoints={{
            300: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className={cx("brand-wrapper")}>
                <img
                  src={brand}
                  alt="brand_le_barrel"
                  className={cx("image")}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box sx={{ marginTop: "50px" }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={5} sm={6} xs={12}>
              <BannerItem
                heading="Clearance"
                image={images.banner1}
                title="Coffee Tables"
                subTitle="from $19.99"
                height={`${matches ? "unset" : "528px"}`}
                aspectRatio={`${matches ? "9/10" : "unset"}`}
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <BannerItem
                heading="On Sale"
                image={images.banner2}
                title="Kitchenware"
                subTitle="from $39.00"
                height={`${matches ? "unset" : "528px"}`}
                aspectRatio={`${matches ? "9/10" : "unset"}`}
              />
            </Grid>
            <Grid item lg={4} container spacing={2} xs={12}>
              <Grid item md={6} lg={12} xs={12}>
                <BannerItem
                  heading="Clearance"
                  image={images.banner3}
                  title="Home Decor"
                  subTitle="up to 30% off"
                  height={"256px"}
                />
              </Grid>
              <Grid item md={6} lg={12} xs={12}>
                <BannerItem
                  heading="New Arrivals"
                  image={images.banner4}
                  title="Collection Chairs"
                  subTitle="from $39.00"
                  height={"256px"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ProductTabs />
      <DealBanner />
      <Box sx={{ padding: "48px 0" }}>
        <Container sx={{ minHeight: "600px" }}>
          <Box sx={{ marginBottom: "24px" }}>
            <h2 className={cx("heading")}>Top Selling Products</h2>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className={cx("tab_btn", { active: category === null })}
                onClick={() => setCategory(null)}
              >
                All
              </button>
              <button
                className={cx("tab_btn", { active: category === 1 })}
                onClick={() => setCategory(1)}
              >
                Lighting
              </button>
              <button
                className={cx("tab_btn", { active: category === 2 })}
                onClick={() => setCategory(2)}
              >
                Furniture
              </button>
              <button
                className={cx("tab_btn", { active: category === 3 })}
                onClick={() => setCategory(3)}
              >
                Decor
              </button>
            </Box>
          </Box>
          <Grid container spacing={2}>
            {productsLoading
              ? sketelonData.map((sketelon) => (
                  <Grid item lg={2.4} md={3} sm={4} xs={6} key={sketelon}>
                    <Skeleton
                      variant="rectangular"
                      width={350}
                      sx={{ paddingTop: "100%", maxWidth: "100%" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      sx={{ fontSize: "20px", marginTop: "10px" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      sx={{ fontSize: "20px" }}
                    />
                  </Grid>
                ))
              : data &&
                data.getProducts?.map((props: ProductItemProps) => (
                  <Grid item lg={2.4} md={3} sm={4} xs={6} key={props.id}>
                    <ProductItem
                      {...props}
                      inWishlist={includeWislist(
                        wishlistData?.getWishlists,
                        props.id
                      )}
                    />
                  </Grid>
                ))}
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box>
        <Container sx={{ minHeight: "600px" }}>
          <Box sx={{ marginBottom: "24px" }}>
            <h2 className={cx("heading")}>From Our Blog</h2>
          </Box>
          <Box>
            <Swiper
              slidesPerView={3}
              pagination={{ clickable: true }}
              spaceBetween={20}
              breakpoints={{
                300: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              <SwiperSlide>
                <BlogItem
                  image={images.Blog1}
                  title="Fusce lacinia arcuet nulla."
                />
              </SwiperSlide>
              <SwiperSlide>
                <BlogItem
                  image={images.Blog2}
                  title="Quisque volutpat mattis eros."
                />
              </SwiperSlide>
              <SwiperSlide>
                <BlogItem
                  image={images.Blog3}
                  title="Cras ornare tristique elit."
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          <button className={cx("more_btn")}>
            View More Articles
            <ArrowRightAltIcon sx={{ fontSize: "18px" }} />
          </button>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#fcf8e7", padding: "46px 0" }}>
        <Container>
          <Grid container spacing={{ lg: 2, xs: 3 }}>
            <Grid item xs={6} md={4} lg={3}>
              <PolicyItem
                icon={
                  <RocketLaunchOutlinedIcon
                    sx={{ fontSize: "34px", color: "#333" }}
                  />
                }
                heading="Free Shipping"
                desc="orders $50 or more"
              />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <PolicyItem
                icon={
                  <RotateLeftOutlinedIcon
                    sx={{ fontSize: "34px", color: "#333" }}
                  />
                }
                heading="Free Returns"
                desc="within 30 days"
              />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <PolicyItem
                icon={
                  <InfoOutlinedIcon sx={{ fontSize: "34px", color: "#333" }} />
                }
                heading="Get 20% Off 1 Item"
                desc="When you sign up"
              />
            </Grid>
            <Grid item xs={6} md={12} lg={3}>
              <PolicyItem
                icon={
                  <SupportOutlinedIcon
                    sx={{ fontSize: "34px", color: "#333" }}
                  />
                }
                heading="We Support"
                desc="24/7 amazing services"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <div
        className={cx("cupon-wrap")}
        style={{
          backgroundImage: `url(${images.parallax})`,
          paddingTop: `${matches ? "40%" : "20%"}`,
        }}
      >
        <div className={cx("cupon-content")}>
          <p className={cx("cupon-title")}>Get The Latest Deals</p>
          <span className={cx("cupon-desc")}>
            and receive <strong>$20 coupon</strong> for first shopping
          </span>
          <div className={cx("give-cupon")}>
            <input
              type="text"
              placeholder="Enter your email address"
              required
            />
            <button>
              Subscribe <ArrowRightAltIcon sx={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>
      </div>
      <QuickView />
    </Box>
  );
};

export default Home;
