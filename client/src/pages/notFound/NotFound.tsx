import { Box, Typography } from "@mui/material";
import { images } from "../../assets/images";
import Button from "../../components/button/Button";

const NotFound = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${images.errorBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: "30%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component={"h1"}>
          Error 404
        </Typography>
        <Typography
          variant="subtitle2"
          component={"p"}
          sx={{
            fontSize: "15px",
            color: "#777",
            fontFamily: "Jost",
            fontWeight: 400,
            margin: "10px 0 20px 0",
          }}
        >
          We are sorry, the page you've requested is not available.
        </Typography>
        <Button title="BACK TO HOMEPAGE" to="/" size="lg" />
      </Box>
    </Box>
  );
};

export default NotFound;
