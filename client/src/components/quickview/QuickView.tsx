import { useMutation, useQuery } from "@apollo/client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Container, Divider, Grid, Rating, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Controller, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../components/button/Button";
import ModalCustom from "../../components/modal/ModalCustom";
import { useQuickView } from "../../context/QuickView";
import { useSnackBar } from "../../context/SnackBar";
import { useAuth } from "../../context/UserContext";
import { CREATE_CART } from "../../graphql/mutation/Cart";
import { GET_CARTS } from "../../graphql/query/Cart";
import { DETAIL_PRODUCT } from "../../graphql/query/Product";
import { GET_WISHLISTS } from "../../graphql/query/Wishlist";
import styles from "./QuickView.module.scss";
import {
  CREATE_WISHLIST,
  REMOVE_WISHLIST_BY_PRODUCT_ID,
} from "../../graphql/mutation/Wishlist";
import { includeWislist } from "../../utils/includeWishlst";

const cx = classNames.bind(styles);

const QuickView = () => {
  const { open, productId, handleClose } = useQuickView();
  const { isAuthenticated } = useAuth();
  const { setOpenSnackBar, setMessageSnackBar } = useSnackBar();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const navigate = useNavigate();

  const location = useLocation();
  const { data, loading } = useQuery(DETAIL_PRODUCT, {
    variables: { id: Number(productId) },
  });

  const { data: wishlistData } = useQuery(GET_WISHLISTS);

  const [createCart] = useMutation(CREATE_CART, {
    refetchQueries: [GET_CARTS],
  });
  const [createWishlist] = useMutation(CREATE_WISHLIST, {
    refetchQueries: [GET_WISHLISTS],
  });

  const [removeWishlistByProductId] = useMutation(
    REMOVE_WISHLIST_BY_PRODUCT_ID,
    { refetchQueries: [GET_WISHLISTS] }
  );

  // fn handle add item to wisjlist
  const handleAddToWishlist = async (id: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const inWishlist = includeWislist(wishlistData?.getWishlists, productId);
    if (!inWishlist) {
      const res = await createWishlist({
        variables: {
          productId: Number(id),
        },
      });
      if (res.data?.createWishlist?.success) {
        setOpenSnackBar(true);
        setMessageSnackBar("Added product to wishlist");
      }
    } else {
      const res = await removeWishlistByProductId({
        variables: {
          productId: Number(id),
        },
      });
      if (res.data?.removeWishlistByProductId?.success) {
        setOpenSnackBar(true);
        setMessageSnackBar("Product removed from wishlist");
      }
    }
  };

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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ marginX: "24px" }}
    >
      <div className={cx("content")}>
        <Box>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: "relative" }}>
                  {loading ? (
                    <Skeleton
                      width={"100%"}
                      sx={{ paddingTop: "100%" }}
                      variant="rectangular"
                    />
                  ) : (
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={1}
                      grabCursor={true}
                      navigation={{
                        nextEl: ".next",
                        prevEl: ".prev",
                      }}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
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
                  )}
                  {!loading && (
                    <>
                      <div className="prev">
                        <NavigateBeforeRoundedIcon />
                      </div>
                      <div className="next">
                        <NavigateNextRoundedIcon />
                      </div>
                    </>
                  )}
                  {loading ? (
                    <div className={cx("sketelon-wrap")}>
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      freeMode={true}
                      loop={false}
                      spaceBetween={6}
                      slidesPerView={4}
                      watchSlidesProgress
                      touchRatio={0.2}
                      slideToClickedSlide={true}
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
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={cx("product-summary")}>
                  {loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "30px" }}
                      width={400}
                    />
                  ) : (
                    <h1 className={cx("product-title")}>
                      {data?.detailProduct?.product?.name}
                    </h1>
                  )}
                  <div className={cx("product-review")}>
                    {loading ? (
                      <Skeleton width={80} height={24} />
                    ) : (
                      data?.detailProduct && (
                        <Rating
                          value={data.detailProduct.product?.averageRating}
                          disabled
                          precision={0.1}
                        />
                      )
                    )}
                    {loading ? (
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "20px" }}
                        width={40}
                      />
                    ) : (
                      data?.detailProduct && (
                        <span className={cx("product-review__count")}>
                          ({data?.detailProduct?.product?.reviews?.length}{" "}
                          Reviews)
                        </span>
                      )
                    )}
                  </div>
                  {loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "24px" }}
                      width={150}
                    />
                  ) : (
                    data?.detailProduct && (
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
                    )
                  )}
                  {loading ? (
                    <Skeleton height={150} width={"100%"} />
                  ) : (
                    <span className={cx("product-desc")}>
                      Morbi purus libero, faucibus adipiscing, commodo quis,
                      gravida id, est. Sed lectus. Praesent elementum hendrerit
                      tortor. Sed semper lorem at felis. Vestibulum volutpat,
                      lacus a ultrices sagittis, mi neque euismod dui, eu
                      pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                      dapibus eu, fermentum et, dapibus sed, urna. Morbi i
                    </span>
                  )}
                  <div className={cx("product-qty")}>
                    {loading ? (
                      <Skeleton variant="rectangular" width={60} height={36} />
                    ) : (
                      <span>Qty:</span>
                    )}
                    {loading ? (
                      <Skeleton variant="rectangular" width={200} height={36} />
                    ) : (
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
                    )}
                  </div>
                  <div className={cx("product-actions")}>
                    {loading ? (
                      <Skeleton variant="rectangular" width={200} height={40} />
                    ) : (
                      <Button
                        title="Add to cart"
                        leftIcon={
                          <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                        }
                        size="lg"
                        onClick={() => handleAddToCart(Number(productId))}
                      />
                    )}
                    {loading ? (
                      <Skeleton variant="rectangular" width={200} height={40} />
                    ) : (
                      <button
                        className={cx("product-actions__wishlist", {
                          active: includeWislist(
                            wishlistData?.getWishlists,
                            productId
                          ),
                        })}
                        onClick={() => handleAddToWishlist(Number(productId))}
                      >
                        {includeWislist(
                          wishlistData?.getWishlists,
                          productId
                        ) ? (
                          <FavoriteIcon
                            sx={{
                              fontSize: "16px",
                              color: "var(--color-primary)",
                            }}
                          />
                        ) : (
                          <FavoriteBorderOutlinedIcon
                            sx={{
                              fontSize: "16px",
                              color: "var(--color-primary)",
                            }}
                          />
                        )}
                        <span>Add to wishlist</span>
                      </button>
                    )}
                  </div>
                </div>
                <Divider />
                <div className={cx("product-meta")}>
                  {loading ? (
                    <Skeleton
                      variant="text"
                      width={200}
                      sx={{ fontSize: "20px" }}
                    />
                  ) : (
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
                                data.detailProduct.product?.categories.length -
                                  1 ? (
                                <li key={category.id}>{category.name}</li>
                              ) : (
                                <li key={category.id}>{category.name},</li>
                              );
                            }
                          )}
                      </ul>
                    </div>
                  )}
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
      </div>
    </Modal>
  );
};

export default QuickView;
