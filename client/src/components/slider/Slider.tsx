import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Container } from "@mui/material";
import { A11y, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { memo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { images } from "../../assets/images";
import Button from "../button/Button";

const Slider = memo(() => {
  return (
    <Box sx={{ backgroundColor: "#EDF2F0" }}>
      <Container>
        <Swiper
          // install Swiper modules
          modules={[Pagination, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          style={{ maxHeight: "500px" }}
        >
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#666",
                    fontFamily: "Jost",
                  }}
                >
                  Deals and Promotions
                </p>
                <p
                  style={{
                    fontSize: "clamp(40px, 7vw, 66px)",
                    fontWeight: "400",
                    color: "#222",
                    fontFamily: "Jost",
                    lineHeight: "1.1",
                  }}
                >
                  Wooden Sideboard Table
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(40px, 7vw, 66px)",
                    color: "var(--color-primary)",
                    fontFamily: "Jost",
                    lineHeight: "1.1",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>$</span>
                  149,99
                </p>
                <Button
                  title="Shop Now"
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                  size="lg"
                  theme="black"
                  to="/shop/all"
                  fitContent
                />
              </Box>
              <img
                src={images.slide1}
                alt="slider_img_1"
                style={{
                  marginLeft: "60px",
                }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#666",
                    fontFamily: "Jost",
                  }}
                >
                  Baskets & Storage
                </p>
                <p
                  style={{
                    fontSize: "clamp(40px, 7vw, 66px)",
                    fontWeight: "400",
                    color: "#222",
                    fontFamily: "Jost",
                    lineHeight: "1.1",
                  }}
                >
                  Laundry Baskets
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(40px, 7vw, 66px)",
                    color: "var(--color-primary)",
                    fontFamily: "Jost",
                    lineHeight: "1.1",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>$</span>
                  149,99
                </p>
                <Button
                  title="Shop Now"
                  onClick={() => {}}
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                  size="lg"
                  theme="black"
                  to="/shop/all"
                  fitContent
                />
              </Box>
              <img
                src={images.slide3}
                alt="slider_img_3"
                style={{
                  marginLeft: "60px",
                }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
});

export default Slider;
