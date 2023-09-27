import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Paper, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import styles from "./ForgetPassword.module.scss";

import { useMutation } from "@apollo/client";
import { useSnackBar } from "../../context/SnackBar";
import { FORGET_PASSWORD } from "../../graphql/mutation/User";
import { useEffect } from "react";

const cx = classNames.bind(styles);
interface formValues {
  email: string;
}
const ForgetPassword = () => {
  const [forgetPassword, { loading }] = useMutation(FORGET_PASSWORD);
  const { setMessageSnackBar, setOpenSnackBar } = useSnackBar();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formValues>();
  const handleForgetPassword: SubmitHandler<formValues> = async (
    data: formValues
  ) => {
    const res = await forgetPassword({ variables: data });
    console.log(res);
    if (res.data.forgetPassword.code === 200) {
      setMessageSnackBar(res.data.forgetPassword.message);
      setOpenSnackBar(true);
    } else {
      setError("email", {
        type: "error",
        message: res.data.forgetPassword?.message,
      });
    }
  };
  useEffect(() => {
    document.title = `My account - Molla Funiture`;
  }, []);
  return (
    <Box
      sx={{
        backgroundImage: `url("../../../../src/assets/images/login-bg.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          maxWidth: "575px",
          padding: "36px 60px 36px",
          margin: "112px 16px",
        }}
      >
        <form className={cx("login-form")}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#777",
              fontFamily: "Jost",
              fontWeight: "400",
            }}
          >
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </Typography>
          <Box sx={{ marginTop: "8px" }}>
            <div className={cx("form-group")}>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
                type="email"
                id="email"
              />
            </div>
          </Box>
          {loading && <span className={cx("loading")}>Please wait ...</span>}
          {errors[Object.keys(errors)[0] as keyof formValues]?.message && (
            <div className={cx("error")}>
              <span className={cx("error-heading")}>Error:</span>
              <span className={cx("error-title")}>
                {errors[Object.keys(errors)[0] as keyof formValues]?.message}
              </span>
            </div>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0 30px 0",
            }}
          >
            <Button
              title="RESET PASSWORD"
              rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
              onClick={handleSubmit(handleForgetPassword)}
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgetPassword;
