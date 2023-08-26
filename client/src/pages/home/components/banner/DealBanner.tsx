import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Button from "../../../../components/button/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { images } from "../../../../assets/images";
import classNames from "classnames/bind";
import styles from "./DealBanner.module.scss";
import CountDownItem from "../time/CountDownItem";

const cx = classNames.bind(styles);

const DealBanner = () => {
  const matches = useMediaQuery("(max-width:900px)");
  return (
    <Box sx={{ backgroundColor: "#EDF3F6", padding: "70px 0" }}>
      <Container>
        <Grid container spacing={{ xs: 0, md: 2 }}>
          <Grid item xs={12} sm={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
              maxHeight={500}
            >
              <Box
                sx={{
                  padding: "16px 0 0 36px",
                  position: `${matches ? "absolute" : "relative"}`,
                  zIndex: 10,
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    fontSize: "16px",
                    color: "var(--color-primary)",
                    lineHeight: "1.3",
                    fontFamily: "Jost",
                  }}
                >
                  Limited Quantities
                </Typography>
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    fontSize: "40px",
                    color: "#333",
                    lineHeight: "1.3",
                    fontWeight: "500",
                    fontFamily: "Jost",
                    marginBottom: "30px",
                  }}
                >
                  Deal Of The Day
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    fontSize: "24px",
                    color: "#333",
                    lineHeight: "1.3",
                    fontWeight: "500",
                    fontFamily: "Jost",
                    marginBottom: "6px",
                  }}
                >
                  POÄNG
                </Typography>
                <Box
                  sx={{ display: "flex", gap: "12px", marginBottom: "20px" }}
                >
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontSize: "24px",
                      color: "#EF837B",
                      lineHeight: "1.3",
                      fontWeight: "500",
                      fontFamily: "Jost",
                    }}
                  >
                    $149.00
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontSize: "24px",
                      color: "#ccc",
                      lineHeight: "1.3",
                      fontWeight: "500",
                      fontFamily: "Jost",
                      textDecoration: "line-through",
                    }}
                  >
                    Was $240.00
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", gap: "20px", marginBottom: "36px" }}
                >
                  <CountDownItem title="HOURS" />
                  <CountDownItem title="MINS" />
                  <CountDownItem title="SECS" />
                </Box>
                <Button
                  title="Shop now"
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                  size="lg"
                  theme="black"
                ></Button>
              </Box>
              <img
                src={images.abImg1}
                style={{ position: "relative", top: "86px", right: "-16px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ height: "100%", position: "relative" }}>
              <picture>
                <source
                  media="(max-width: 900px)"
                  srcSet={images.banner5Small}
                />
                <img
                  src={images.banner5}
                  alt="Chris standing up holding his daughter Elva"
                  className={cx("banner-img")}
                />
              </picture>
              <Box
                sx={{
                  position: "absolute",
                  top: "54px",
                  left: "30px",
                  maxWidth: "200px",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    fontSize: "16px",
                    color: "#fff",
                    fontFamily: "Jost",
                    marginBottom: "10px",
                  }}
                >
                  The Best Choice
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontSize: "30px",
                    color: "#fff",
                    fontFamily: "Jost",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  Indigo bed linen
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    fontSize: "24px",
                    color: "#fff",
                    fontFamily: "Jost",
                    marginBottom: "16px",
                  }}
                >
                  $49.99
                </Typography>
                <Button
                  title="Shop now"
                  rightIcon={<ArrowRightAltIcon sx={{ fontSize: "18px" }} />}
                  onClick={() => {}}
                  theme="black"
                ></Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DealBanner;
