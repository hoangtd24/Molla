import { useMutation } from "@apollo/client";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Rating } from "@mui/material";
import classNames from "classnames/bind";
import { REVIEW_EMOTION } from "../../graphql/mutation/Review";
import styles from "./ReviewItem.module.scss";
import moment from "moment";

const cx = classNames.bind(styles);
export interface ReviewItemprops {
  id: number;
  user: {
    username: string;
  };
  content: string;
  rating: number;
  like: {
    id: number;
  }[];
  dislike: {
    id: number;
  }[];
  createdAt: string;
}
const ReviewItem = ({
  id,
  user,
  content,
  rating,
  like,
  dislike,
  createdAt,
}: ReviewItemprops) => {
  const [reviewEmotion] = useMutation(REVIEW_EMOTION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          getReviews(existing) {
            if (data?.reviewEmotion.code === 200) {
              const review = data.reviewEmotion.review;
              const index = existing.paginatedReviews.findIndex(
                (item: ReviewItemprops) => item.id === review.id
              );

              const newReviewAfterReact = {
                ...existing,
                paginatedReviews: [
                  ...existing.paginatedReviews.slice(0, index),
                  review,
                  ...existing.paginatedReviews.slice(index + 1),
                ],
              };
              return newReviewAfterReact;
            }
          },
        },
      });
    },
  });
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string).id
    : null;

  const handleLikeReiview = (reviewId: number) => {
    reviewEmotion({
      variables: {
        reviewId,
        action: "like",
      },
    });
  };
  const handleDislikeReiview = (reviewId: number) => {
    reviewEmotion({
      variables: {
        reviewId,
        action: "dislike",
      },
    });
  };
  return (
    <div className={cx("review-wrap")}>
      <h4 className={cx("review-author")}>{user.username}</h4>
      <div className={cx("review-content")}>
        <div className={cx("review-content__left")}>
          <div className={cx("review-rating")}>
            <Rating
              name="simple-controlled"
              value={rating}
              sx={{ fontSize: "16px" }}
              disabled
              precision={0.5}
            />
          </div>
          <span className={cx("review-time")}>
            {moment(createdAt).fromNow()}
          </span>
        </div>
        <div className={cx("review-content__right")}>
          <p>{content}</p>
          <div className={cx("actions")}>
            <div
              className={cx(
                "actions-item",
                `${
                  like.findIndex((item) => item.id === userId) !== -1
                    ? "like"
                    : ""
                }`
              )}
              onClick={() => handleLikeReiview(id)}
            >
              <span className={cx("actions-item__icon")}>
                <ThumbUpOutlinedIcon sx={{ fontSize: "14px" }} />
              </span>
              <span className={cx("actions-item__count")}>
                Helpful({like.length})
              </span>
            </div>
            <div
              className={cx(
                "actions-item",
                `${
                  dislike.findIndex((item) => item.id === userId) !== -1
                    ? "dislike"
                    : ""
                }`
              )}
              onClick={() => handleDislikeReiview(id)}
            >
              <span className={cx("actions-item__icon")}>
                <ThumbDownOutlinedIcon sx={{ fontSize: "14px" }} />
              </span>
              <span className={cx("actions-item__count")}>
                Unhelpful({dislike.length})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
