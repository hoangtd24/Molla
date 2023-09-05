import {
  Box,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  useMediaQuery,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import styles from "./Home.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { useLazyQuery, useQuery } from "@apollo/client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { images } from "../../assets/images";
import BannerItem from "./components/banner/BannerItem";
import DealBanner from "./components/banner/DealBanner";
import BlogItem from "../../components/blogItem/BlogItem";
import ProductItem, {
  ProductItemProps,
} from "../../components/productItem/ProductItem";
import { brands } from "../../data";
import { FILTER_PRODUCT, GET_PRODUCTS } from "../../graphql/query/Product";
import { ItemCenter } from "../../styles";
import PolicyItem from "./components/policyItem/PolicyItem";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";

const cx = classNames.bind(styles);
const Home = () => {
  const tabStyle = {
    fontSize: "30px",
    textTransform: "none",
    fontWeight: "500",
    fontFamily: "Jost",
  };
  const [value, setValue] = React.useState(0);
  const [sale, setSale] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(false);
  const [category, setCategory] = useState<number | null>(null);
  const matches = useMediaQuery("(max-width:900px)");
  // const [tab, setTab] = useState<number | null>(null);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: dataFilter } = useQuery(FILTER_PRODUCT, {
    variables: {
      limit: 10,
      page: 1,
      sale: sale,
      top: top,
    },
  });
  const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS);
  useEffect(() => {
    getProducts({
      variables: {
        skip: 0,
        category: category,
      },
    });
  }, [category, getProducts]);

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
              <Box
                style={ItemCenter}
                sx={{
                  height: "90px",
                  border: "1px solid #ccc",
                  borderTop: "none",
                }}
              >
                <img
                  src={brand}
                  alt="brand_le_barrel"
                  className={cx("image")}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box sx={{ marginTop: "50px" }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={5} md={6} xs={12}>
              <BannerItem
                heading="Clearance"
                image={images.banner1}
                title="Coffee Tables"
                subTitle="from $19.99"
                height={528}
              />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <BannerItem
                heading="On Sale"
                image={images.banner2}
                title="Kitchenware"
                subTitle="from $39.00"
                height={528}
              />
            </Grid>
            <Grid item lg={4} container spacing={2} xs={12}>
              <Grid item md={6} lg={12} xs={12}>
                <BannerItem
                  heading="Clearance"
                  image={images.banner3}
                  title="Home Decor"
                  subTitle="up to 30% off"
                  height={256}
                />
              </Grid>
              <Grid item md={6} lg={12} xs={12}>
                <BannerItem
                  heading="New Arrivals"
                  image={images.banner4}
                  title="Collection Chairs"
                  subTitle="from $39.00"
                  height={256}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ marginTop: "40px" }}>
        <Box
          sx={{
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            color: "#333",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: {
                backgroundColor: "var(--color-primary)",
              },
            }}
          >
            <Tab
              label="Featured"
              sx={tabStyle}
              onClick={() => {
                setSale(false);
                setTop(false);
              }}
            />
            <Tab
              label="On Sale"
              sx={tabStyle}
              onClick={() => {
                setSale(true);
                setTop(false);
              }}
            />
            <Tab
              label="Top Rated"
              sx={tabStyle}
              onClick={() => {
                setTop(true);
                setSale(false);
              }}
            />
          </Tabs>
        </Box>
        <Box
          sx={{
            padding: "40px 24px",
            minHeight: `${matches ? "400px" : "600px"} `,
          }}
        >
          <Swiper
            modules={[Pagination]}
            slidesPerView={4}
            pagination={{ clickable: true }}
            style={{ maxHeight: "500px" }}
            spaceBetween={32}
            breakpoints={{
              300: { slidesPerView: 2 },
              600: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {dataFilter &&
              dataFilter.filter?.products?.map((props: ProductItemProps) => (
                <SwiperSlide key={props.id}>
                  <ProductItem {...props} />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      </Box>
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
            {data &&
              data.getProducts?.map((props: ProductItemProps) => (
                <Grid item lg={2.4} md={3} sm={4} xs={6} key={props.id}>
                  <ProductItem {...props} />
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
      <Box
        sx={{
          backgroundImage: `url(${images.parallax})`,
          paddingTop: `${matches ? "40%" : "20%"}`,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: `${matches ? "30px" : "40px"}`,
              color: "#fff",
              fontFamily: "Jost",
              marginBottom: "4px",
            }}
          >
            Get The Latest Deals
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{
              fontSize: `${matches ? "14px" : "15px"}`,
              color: "#fff",
              fontFamily: "Jost",
              fontWeight: "300",
              marginBottom: `${matches ? "16px" : "24px"}`,
            }}
          >
            and receive <strong>$20 coupon</strong> for first shopping
          </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
