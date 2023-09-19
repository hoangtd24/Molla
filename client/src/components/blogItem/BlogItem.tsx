import { Box } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./BlogItem.module.scss";

const cx = classNames.bind(styles);

interface BlogProps {
  image: string;
  title: string;
}
const BlogItem = ({ image, title }: BlogProps) => {
  return (
    <Box maxWidth={376} sx={{ margin: "auto" }}>
      <Box
        sx={{
          paddingTop: "66.5%",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          paddingY: "16px",
        }}
      >
        <Box sx={{ fontSize: "16px", color: "#999", fontFamily: "Jost" }}>
          <span> March 29, 2020, </span>
          <span> 0 Comments</span>
        </Box>
        <h1>
          <Link to="/" className={cx("title")}>
            {title}
          </Link>
        </h1>
        <Link to="/" className={cx("read_btn")}>
          Continue reading
        </Link>
      </Box>
    </Box>
  );
};

export default BlogItem;
