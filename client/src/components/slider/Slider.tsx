import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Container, Typography } from "@mui/material";
import { A11y, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Button from "../button/Button";

const Slider = () => {
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
                <Typography
                  variant="h4"
                  sx={{ fontSize: "18px", color: "#666", fontFamily: "Jost" }}
                >
                  Deals and Promotions
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "clamp(40px, 7vw, 66px)",
                    fontWeight: "400",
                    color: "#222",
                    fontFamily: "Jost",
                  }}
                >
                  Wooden Sideboard Table
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(40px, 7vw, 66px)",
                    color: "var(--color-primary)",
                    fontFamily: "Jost",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>$</span>
                  149,99
                </Typography>
                <Button
                  title="Shop Now"
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                  size="lg"
                  theme="black"
                />
              </Box>
              <img src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/11/slide-1-3.png" />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                maxHeight: "500px",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontSize: "18px", color: "#666", fontFamily: "Jost" }}
                >
                  Bedroom Furniture
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "clamp(40px, 7vw, 66px)",
                    fontWeight: "400",
                    color: "#222",
                    fontFamily: "Jost",
                  }}
                >
                  Find Comfort That Suits You.
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(40px, 7vw, 66px)",
                    color: "var(--color-primary)",
                    fontFamily: "Jost",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>$</span>
                  149,99
                </Typography>
                <Button
                  title="Shop Now"
                  onClick={() => {}}
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                  size="lg"
                  theme="black"
                />
              </Box>
              <img src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/11/slide-2.jpg" />
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
                <Typography
                  variant="h4"
                  sx={{ fontSize: "18px", color: "#666", fontFamily: "Jost" }}
                >
                  Baskets & Storage
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "clamp(40px, 7vw, 66px)",
                    fontWeight: "400",
                    color: "#222",
                    fontFamily: "Jost",
                  }}
                >
                  Laundry Baskets
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(40px, 7vw, 66px)",
                    color: "var(--color-primary)",
                    fontFamily: "Jost",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>$</span>
                  149,99
                </Typography>
                <Button
                  title="Shop Now"
                  onClick={() => {}}
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                  size="lg"
                  theme="black"
                />
              </Box>
              <img src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/11/slide-3-1.png" />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
};

export default Slider;
