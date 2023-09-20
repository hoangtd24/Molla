import { Box, Skeleton, Tab, Tabs, useMediaQuery } from "@mui/material";
import { memo, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem, {
  ProductItemProps,
} from "../../../../components/productItem/ProductItem";
import { includeWislist } from "../../../../utils/includeWishlst";
import { useQuery } from "@apollo/client";
import { FILTER_PRODUCT } from "../../../../graphql/query/Product";
import { GET_WISHLISTS } from "../../../../graphql/query/Wishlist";
import { sketelonData } from "../../../../data";

const ProductTabs = memo(() => {
  const matches = useMediaQuery("(max-width:900px)");

  const tabStyle = {
    fontSize: "clamp(20px, 2vw, 30px)",
    textTransform: "none",
    fontWeight: "500",
    fontFamily: "Jost",
  };
  const [value, setValue] = useState(0);
  const [sale, setSale] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(false);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //product filter
  const { data: dataFilter, loading } = useQuery(FILTER_PRODUCT, {
    variables: {
      limit: 10,
      page: 1,
      sale: sale,
      top: top,
    },
  });
  const { data: wishlistData } = useQuery(GET_WISHLISTS);
  return (
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
          style={{
            maxHeight: "500px",
          }}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 2, spaceBetween: 16 },
            320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 16 },
            640: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 16 },
            1024: { slidesPerView: 5, slidesPerGroup: 3, spaceBetween: 16 },
          }}
        >
          {loading
            ? sketelonData.map((sketelon) => (
                <SwiperSlide key={sketelon}>
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
                </SwiperSlide>
              ))
            : dataFilter &&
              dataFilter.filter?.products?.map((props: ProductItemProps) => (
                <SwiperSlide key={props.id} style={{ marginBottom: "60px" }}>
                  <ProductItem
                    {...props}
                    inWishlist={includeWislist(
                      wishlistData?.getWishlists,
                      props.id
                    )}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </Box>
  );
});

export default ProductTabs;
