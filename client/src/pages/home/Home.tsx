import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import classNames from "classnames/bind";
import Slider from "../../components/slider/Slider";
import styles from "./Home.module.scss";
import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { brands } from "../../data";
import { ItemCenter } from "../../styles";
import BannerItem from "../../components/banner/BannerItem";
import { images } from "../../assets/images";
import ProductItem from "../../components/productItem/ProductItem";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const cx = classNames.bind(styles);
const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Slider />
      <Box sx={{ backgroundColor: "#fff" }}>
        <Swiper
          // install Swiper modules
          slidesPerView={4}
          pagination={{ clickable: true }}
          style={{ maxHeight: "500px" }}
          breakpoints={{
            480: { slidesPerView: 2 },
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
              sx={{
                fontSize: "30px",
                textTransform: "none",
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            />
            <Tab
              label="On Sale"
              sx={{
                fontSize: "30px",
                textTransform: "none",
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            />
            <Tab
              label="Top Rated"
              sx={{
                fontSize: "30px",
                textTransform: "none",
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProductItem />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          On Sale
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Top Rated
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Home;
