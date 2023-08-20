import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Container,
  Grid,
  Rating,
  Divider,
  Tabs,
  Tab,
  TextareaAutosize,
} from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Controller, FreeMode, Navigation, Thumbs } from "swiper/modules";
import classNames from "classnames/bind";
import styles from "./DetailProduct.module.scss";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "../../components/button/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ReviewItem from "../../components/reviewItem/ReviewItem";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export default function AdSwiper() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              grabCursor={true}
              navigation={true}
              thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
              modules={[FreeMode, Navigation, Thumbs, Controller]}
            >
              <SwiperSlide>
                <img
                  src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/03/product-1-hover.jpg"
                  className={cx("zoom-img")}
                  alt="zoom-img"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/03/product-1-3.jpg"
                  className={cx("zoom-img")}
                  alt="zoom-img"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              loop={false}
              spaceBetween={6}
              slidesPerView={4}
              watchSlidesProgress
              touchRatio={0.2}
              slideToClickedSlide={true}
              onSwiper={setThumbsSwiper}
              modules={[Navigation, Thumbs, Controller]}
              className={cx("thumb-swiper")}
            >
              <SwiperSlide>
                <img
                  src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/03/product-1-hover.jpg"
                  className={cx("thumb-img")}
                  alt="thumb-img"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://d-themes.com/wordpress/molla/demo-1/wp-content/uploads/sites/2/2020/03/product-1-3.jpg"
                  className={cx("thumb-img")}
                  alt="thumb-img"
                />
              </SwiperSlide>
            </Swiper>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className={cx("product-summary")}>
              <h2 className={cx("product-title")}>Black Garden chair</h2>
              <div className={cx("product-review")}>
                <Rating value={4} disabled />
                <span className={cx("product-review__count")}>(0 Reviews)</span>
              </div>
              <div className={cx("product-price")}>
                <span className={cx("product-price__new")}>$93</span>
                <span className={cx("product-price__old")}>$94</span>
              </div>
              <span className={cx("product-desc")}>
                Morbi purus libero, faucibus adipiscing, commodo quis, gravida
                id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed
                semper lorem at felis. Vestibulum volutpat, lacus a ultrices
                sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare
                nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus
                sed, urna. Morbi i
              </span>
              <div className={cx("product-qty")}>
                <span>Qty:</span>
                <div className={cx("product-qty__actions")}>
                  <span className={cx("product-qty__icons")}>
                    <RemoveOutlinedIcon sx={{ fontSize: "16px" }} />
                  </span>
                  <span>1</span>
                  <span className={cx("product-qty__icons")}>
                    <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  </span>
                </div>
              </div>
              <div className={cx("product-actions")}>
                <Button
                  title="Add to cart"
                  leftIcon={
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "18px" }} />
                  }
                  onClick={() => {}}
                  large
                />
                <button className={cx("product-actions__wishlist")}>
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: "16px", color: "var(--color-primary)" }}
                  />
                  <span>Add to wishlist</span>
                </button>
              </div>
            </div>
            <Divider />
            <div className={cx("product-meta")}>
              <div className={cx("product-category")}>
                <span>Category:</span>
                <ul className={cx("product-category__list")}>
                  <li>Decor</li>,<li>Furniture</li>
                </ul>
              </div>
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
            </div>
          </Grid>
        </Grid>
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
              scrollButtons
              allowScrollButtonsMobile
              variant="scrollable"
            >
              <Tab label="Description" />
              <Tab label="Additional information" />
              <Tab label="Reviews" />
              <Tab label="Shipping & Returns" />
            </Tabs>
          </Box>
          <div className={cx("tab-wrapper")}>
            {value === 0 && (
              <div className={cx("tab-content")}>
                <h4 className={cx("tab-title")}>Product Information</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                  erat ut turpis. Suspendisse urna viverra non, semper suscipit,
                  posuere a, pede. Donec nec justo eget felis facilisis
                  fermentum. Aliquam porttitor mauris sit amet orci. Aenean
                  dignissim pellentesque felis. Phasellus ultrices nulla quis
                  nibh. Quisque a lectus. Donec consectetuer ligula vulputate
                  sem tristique cursus.
                </p>
                <ul>
                  <li>
                    Nunc nec porttitor turpis. In eu risus enim. In vitae mollis
                    elit.
                  </li>
                  <li>Vivamus finibus vel mauris ut vehicula.</li>
                  <li>
                    Nullam a magna porttitor, dictum risus nec, faucibus sapien.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio
                  </li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                  erat ut turpis. Suspendisse urna viverra non, semper suscipit,
                  posuere a, pede. Donec nec justo eget felis facilisis
                  fermentum. Aliquam porttitor mauris sit amet orci. Aenean
                  dignissim pellentesque felis. Phasellus ultrices nulla quis
                  nibh. Quisque a lectus. Donec consectetuer ligula vulputate
                  sem tristique cursus.
                </p>
              </div>
            )}
            {value === 1 && (
              <div className={cx("tab-content")}>
                <h4 className={cx("tab-title")}>Information</h4>
                <div className={cx("product-attribute")}>
                  <h5>Color</h5>
                  <p>Black, Blue, Brown, Green, Grey, Pink, Red, Yellow</p>
                </div>
                <div className={cx("product-attribute")}>
                  <h5>Size</h5>
                  <p>L, M, S, XL, XS, XXL</p>
                </div>
              </div>
            )}
            {value === 2 && (
              <div className={cx("tab-content")}>
                <h4 className={cx("tab-title")}>Reviews</h4>
                <ReviewItem />
                <Divider />
                <form className={cx("rating-form")}>
                  <h4 className={cx("form-title")}>Add A Review</h4>
                  <p className={cx("form-sub-title")}>
                    Your email address will not be published. Required fields
                    are marked <span className={cx("required")}>*</span>
                  </p>
                  <div className={cx("form-field")}>
                    <p className={cx("field-name")}>
                      Your rating <span className={cx("required")}>*</span>
                    </p>
                    <Rating
                      name="simple-controlled"
                      value={0}
                      sx={{ fontSize: "16px" }}
                    />
                  </div>
                  <div className={cx("form-field")}>
                    <p className={cx("field-name")}>
                      Your review <span className={cx("required")}>*</span>
                    </p>
                    <TextareaAutosize
                      style={{
                        maxWidth: "100%",
                        width: "100%",
                        minHeight: "42px",
                        outline: "none",
                        padding: "12px 20px",
                      }}
                    />
                  </div>
                  <Button title="Submit" type="submit" small></Button>
                </form>
              </div>
            )}
            {value === 3 && (
              <div className={cx("tab-content")}>
                <h4 className={cx("tab-title")}>Shipping & Returns</h4>
                <p>
                  We deliver to over 100 countries around the world. For full
                  details of the delivery options we offer, please view our.
                  <Link to="/" className={cx("tab-link")}>
                    Delivery information
                  </Link>
                </p>
                <p>
                  We hope you’ll love every purchase, but if you ever need to
                  return an item you can do so within a month of receipt. For
                  full details of how to make a return, please view our.
                  <Link to="/" className={cx("tab-link")}>
                    Returns information
                  </Link>
                </p>
              </div>
            )}
          </div>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <h2 className={cx("related-heading")}>Related products</h2>
        </Box>
      </Container>
    </Box>
  );
}
