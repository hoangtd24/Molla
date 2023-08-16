import { Box, Typography } from "@mui/material";
import Button from "../../../../components/button/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface bannerProps {
  heading: string;
  title: string;
  subTitle: string;
  image: string;
  height: number;
}
const BannerItem = ({
  heading,
  image,
  subTitle,
  title,
  height,
}: bannerProps) => {
  return (
    <Box sx={{ position: "relative" }} height={height}>
      <img
        src={image}
        style={{ width: "100%", objectFit: "cover", height: "100%" }}
      />
      <Box sx={{ position: "absolute", top: "50px", left: "36px" }}>
        <Typography
          variant="h4"
          sx={{ fontSize: "16px", color: "#999", fontFamily: "Jost" }}
        >
          {heading}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "30px",
            fontWeight: "500",
            color: "#222",
            fontFamily: "Jost",
            marginTop: "12px",
            marginBottom: "6px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            color: "#333",
            fontFamily: "Jost",
            marginBottom: "14px",
          }}
        >
          {subTitle}
        </Typography>
        <Button
          title="Shop Now"
          onClick={() => {}}
          rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
          type="submit"
          small
          black
        />
      </Box>
    </Box>
  );
};

export default BannerItem;
