import { useMutation, useQuery } from "@apollo/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Divider,
  Rating,
  Tab,
  Tabs,
  TextareaAutosize,
} from "@mui/material";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import Button from "../../components/button/Button";
import ReviewItem, {
  ReviewItemprops,
} from "../../components/reviewItem/ReviewItem";
import { CREATE_REVIEW } from "../../graphql/mutation/Review";
import { GET_REVIEWS } from "../../graphql/query/Review";
import styles from "./WoocommerTabs.module.scss";

const cx = classNames.bind(styles);

interface WoocommerTabsProps {
  productId: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function WoocommerTabs({
  productId,
  setOpenModal,
}: WoocommerTabsProps) {
  const [value, setValue] = useState(0);
  const [rating, setRating] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const param = useParams();

  //handle change tabs
  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const { data, fetchMore } = useQuery(GET_REVIEWS, {
    variables: { productId: productId, limit: 2 },
    notifyOnNetworkStatusChange: true,
  });

  const [createReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_REVIEWS],
  });
  //create review
  const handleCreateReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      setOpenModal(true);
      return;
    }
    createReview({
      variables: {
        reviewInput: {
          rating,
          userId: 1,
          content: inputRef.current?.value,
          productId: Number(param.id),
        },
      },
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setRating(0);
  };
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
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci. Aenean dignissim pellentesque
              felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus.
            </p>
            <ul>
              <li>
                Nunc nec porttitor turpis. In eu risus enim. In vitae mollis
                elit.
              </li>
              <li>Vivamus finibus vel mauris ut vehicula.</li>
              <li>
                Nullam a magna porttitor, dictum risus nec, faucibus sapien.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
                odio
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci. Aenean dignissim pellentesque
              felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus.
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
            {data &&
              data.getReviews?.paginatedReviews.map(
                (review: ReviewItemprops) => (
                  <ReviewItem {...review} key={review.id} />
                )
              )}
            {data && data.getReviews?.hasMore && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginY: "24px",
                }}
              >
                <Button
                  title="Load More"
                  theme="black"
                  rightIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
                  onClick={() =>
                    fetchMore({
                      variables: {
                        limit: 2,
                        productId: Number(param.id),
                        cursor: data.getReviews?.cursor,
                      },
                    })
                  }
                />
              </Box>
            )}
            <Divider />
            <form className={cx("rating-form")} onSubmit={handleCreateReview}>
              <h4 className={cx("form-title")}>Add A Review</h4>
              <p className={cx("form-sub-title")}>
                Your email address will not be published. Required fields are
                marked <span className={cx("required")}>*</span>
              </p>
              <div className={cx("form-field")}>
                <p className={cx("field-name")}>
                  Your rating <span className={cx("required")}>*</span>
                </p>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  sx={{ fontSize: "16px" }}
                  onChange={(_event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
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
                    fontFamily:"Jost"
                  }}
                  ref={inputRef}
                />
              </div>
              <Button title="Submit"></Button>
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
              We hope you’ll love every purchase, but if you ever need to return
              an item you can do so within a month of receipt. For full details
              of how to make a return, please view our.
              <Link to="/" className={cx("tab-link")}>
                Returns information
              </Link>
            </p>
          </div>
        )}
      </div>
    </Box>
  );
}
