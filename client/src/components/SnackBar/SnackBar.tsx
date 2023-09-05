import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { useSnackBar } from "../../context/SnackBar";

const SnackBar = () => {
  const { message, open, setOpenSnackBar } = useSnackBar();
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            minWidth: "280px",
          }}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackBar;
