import { Box, Typography } from "@mui/material";
const CountDownItem = ({ title }: { title: string }) => {
  return (
    <Box
      sx={{
        padding: "14px",
        backgroundColor: "var(--color-primary)",
        borderRadius: "3px",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: "30px",
          fontFamily: "Jost",
          color: "#fff",
          fontWeight: "500",
        }}
      >
        00
      </Typography>
      <Typography
        variant="h4"
        component="span"
        sx={{
          fontSize: "13px",
          fontFamily: "Jost",
          color: "#fff",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default CountDownItem;
