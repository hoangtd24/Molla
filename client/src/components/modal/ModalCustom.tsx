import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import styles from "./ModalCustom.module.scss";

const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "32px 24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  outline: "none",
};

interface ModalCustomProps {
  open: boolean;
  action: () => void;
  cancelAction: () => void;
}
export default function ModalCustom({
  open,
  cancelAction,
  action,
}: ModalCustomProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={cancelAction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h4"
            sx={{ fontFamily: "Jost" }}
          >
            Please login to take this action !
          </Typography>
          <div
            className={cx("modal-actions")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              marginTop: "32px",
            }}
          >
            <button onClick={cancelAction}>Cancel</button>
            <button onClick={action}>Ok</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
