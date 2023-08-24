import classNames from "classnames/bind";
import styles from "./ReviewItem.module.scss";
import { Rating } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

const cx = classNames.bind(styles);
export interface ReviewItemprops {
  id: number;
  user: {
    username: string;
  };
  content: string;
  rating: number;
}
const ReviewItem = ({ user, content, rating }: ReviewItemprops) => {
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
          <span className={cx("review-time")}>3 years ago</span>
        </div>
        <div className={cx("review-content__right")}>
          <p>{content}</p>
          <div className={cx("actions")}>
            <div className={cx("actions-item")}>
              <span className={cx("actions-item__icon")}>
                <ThumbUpOutlinedIcon sx={{ fontSize: "14px" }} />
              </span>
              <span className={cx("actions-item__count")}>Helpful(7)</span>
            </div>
            <div className={cx("actions-item")}>
              <span className={cx("actions-item__icon")}>
                <ThumbDownOutlinedIcon sx={{ fontSize: "14px" }} />
              </span>
              <span className={cx("actions-item__count")}>Unhelpful(1)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
