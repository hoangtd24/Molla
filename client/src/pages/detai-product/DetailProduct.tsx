import { useMutation, useQuery } from "@apollo/client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Divider, Grid, Rating } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  Controller,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../components/button/Button";
import ModalCustom from "../../components/modal/ModalCustom";
import ProductItem, {
  ProductItemProps,
} from "../../components/productItem/ProductItem";
import { WoocommerTabs } from "../../components/woocommerceTabs/WoocommerceTabs";
import { useSnackBar } from "../../context/SnackBar";
import { useAuth } from "../../context/UserContext";
import { CREATE_CART } from "../../graphql/mutation/Cart";
import { GET_CARTS } from "../../graphql/query/Cart";
import { DETAIL_PRODUCT } from "../../graphql/query/Product";
import styles from "./DetailProduct.module.scss";
import { includeWislist } from "../../utils/includeWishlst";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";

const cx = classNames.bind(styles);

export default function DetailProduct() {
  const { isAuthenticated } = useAuth();
  const { setOpenSnackBar, setMessageSnackBar } = useSnackBar();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const param = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const { data } = useQuery(DETAIL_PRODUCT, {
    variables: { id: Number(param.id) },
  });

  const { data: wishlistData } = useQuery(GET_WISHLISTS);

  const [createCart] = useMutation(CREATE_CART, {
    refetchQueries: [GET_CARTS],
  });

  useEffect(() => {
    if (data?.detailProduct?.product?.name)
      document.title = `${data.detailProduct.product.name}-Molla Funiture`;
  }, [data]);
  const handleAddToCart = async (id: number) => {
    if (!isAuthenticated) {
      navigate("/login", { state: location });
    }
    const res = await createCart({
      variables: {
        cartInput: {
          productId: Number(id),
          quantity: qty,
        },
      },
    });
    if (res.data?.createCart?.success) {
      setOpenSnackBar(true);
      setMessageSnackBar("Add to cart successfully");
    }
  };
  useLayoutEffect(() => {
    if (qty < 1) {
      setQty(1);
    }
  }, [qty]);

  return (
    <Box>
      <Container>
        <div className={cx("breadcrumbs")}>
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <span>{data && data.detailProduct.product?.name}</span>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "relative" }}>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                grabCursor={true}
                navigation={{
                  nextEl: ".next",
                  prevEl: ".prev",
                }}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs, Controller]}
              >
                {data &&
                  data?.detailProduct?.product?.images?.map(
                    (image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <div
                          style={{
                            backgroundColor: "#f4f4f4",
                            display: "flex",
                            marginBottom: "6px",
                          }}
                        >
                          <img
                            src={image}
                            className={cx("zoom-img")}
                            alt="zoom-img"
                          />
                        </div>
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
              <div className="prev">
                <NavigateBeforeRoundedIcon />
              </div>
              <div className="next">
                <NavigateNextRoundedIcon />
              </div>
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
                {data &&
                  data?.detailProduct?.product?.images?.map(
                    (image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          className={cx("thumb-img")}
                          alt="thumb-img"
                        />
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className={cx("product-summary")}>
              <h2 className={cx("product-title")}>
                {data?.detailProduct?.product?.name}
              </h2>
              {data?.detailProduct && (
                <div className={cx("product-review")}>
                  <Rating
                    value={data.detailProduct?.product?.averageRating}
                    disabled
                    precision={0.1}
                  />
                  <span className={cx("product-review__count")}>
                    ({data?.detailProduct?.product?.reviews?.length} Reviews)
                  </span>
                </div>
              )}
              <div className={cx("product-price")}>
                {data?.detailProduct?.product?.discount ? (
                  <>
                    <span className={cx("product-price__new")}>
                      ${data?.detailProduct?.product?.newPrice}
                    </span>
                    <span className={cx("product-price__old")}>
                      ${data?.detailProduct?.product?.price}
                    </span>
                  </>
                ) : (
                  `$${data?.detailProduct?.product?.newPrice}`
                )}
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
                  <span
                    className={cx("product-qty__icons")}
                    onClick={() => setQty((prev) => prev - 1)}
                  >
                    <RemoveOutlinedIcon sx={{ fontSize: "16px" }} />
                  </span>
                  <span>{qty}</span>
                  <span
                    className={cx("product-qty__icons")}
                    onClick={() => setQty((prev) => prev + 1)}
                  >
                    <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  </span>
                </div>
              </div>
              <div className={cx("product-actions")}>
                <Button
                  title="Add to cart"
                  leftIcon={
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                  }
                  size="lg"
                  onClick={() => handleAddToCart(Number(param.id))}
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
                  {data &&
                    data.detailProduct.product?.categories.map(
                      (
                        category: {
                          id: number;
                          name: string;
                        },
                        index: number
                      ) => {
                        return index ===
                          data.detailProduct.product?.categories.length - 1 ? (
                          <li key={category.id}>{category.name}</li>
                        ) : (
                          <li key={category.id}>{category.name},</li>
                        );
                      }
                    )}
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
        <WoocommerTabs
          productId={Number(param.id)}
          setOpenModal={setOpenModal}
        />
        <Box sx={{ marginY: "40px" }}>
          <h2 className={cx("related-heading")}>Related products</h2>
          <Box>
            <Swiper
              modules={[Pagination]}
              slidesPerView={4}
              pagination={{ clickable: true }}
              style={{ maxHeight: "500px" }}
              spaceBetween={32}
              breakpoints={{
                300: { slidesPerView: 2, slidesPerGroup: 2 },
                600: { slidesPerView: 3, slidesPerGroup: 2 },
                1200: { slidesPerView: 4, slidesPerGroup: 3 },
              }}
            >
              {data &&
                data.detailProduct?.relatedProduct?.map(
                  (product: ProductItemProps) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem
                        {...product}
                        inWishlist={includeWislist(
                          wishlistData?.getWishlists,
                          product.id
                        )}
                      />
                    </SwiperSlide>
                  )
                )}
            </Swiper>
          </Box>
        </Box>
      </Container>
      <ModalCustom
        open={openModal}
        action={() => {
          setOpenModal(false);
          navigate("/login");
        }}
        cancelAction={() => setOpenModal(false)}
      />
    </Box>
  );
}
