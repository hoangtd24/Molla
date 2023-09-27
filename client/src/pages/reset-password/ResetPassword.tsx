import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Paper, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import styles from "./ResetPassword.module.scss";

import { useMutation } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackBar } from "../../context/SnackBar";
import { RESET_PASSWORD } from "../../graphql/mutation/User";
import { useEffect } from "react";

const cx = classNames.bind(styles);
interface formValues {
  password: string;
  PasswordConfirm: string;
}
const ResetPassword = () => {
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const { setMessageSnackBar, setOpenSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const [param] = useSearchParams();
  //initial form values
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formValues>();

  // funtion reset password
  const handleResetPassword: SubmitHandler<formValues> = async (
    data: formValues
  ) => {
    if (data.password !== data.PasswordConfirm) {
      setError("password", {
        type: "error",
        message: "Password confirm incorrect",
      });
      return;
    }
    const res = await resetPassword({
      variables: {
        resetPasswordInput: {
          userId: param.get("userId"),
          token: param.get("token"),
          password: data.password,
        },
      },
    });
    if (res.data.resetPassword.code === 200) {
      setMessageSnackBar(res.data.resetPassword.message);
      setOpenSnackBar(true);
      navigate("/login");
    } else {
      setError("password", {
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
          width: "575px",
          padding: "36px 60px 36px",
          margin: "112px 16px",
          maxWidth: "100%",
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
            Please enter full information to reset your password
          </Typography>
          <Box sx={{ marginTop: "8px" }}>
            <div className={cx("form-group")}>
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                type="password"
                id="password"
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="passwordConfirm">Password Confirm</label>
              <input
                {...register("PasswordConfirm", {
                  required: {
                    value: true,
                    message: "Password confirm is required",
                  },
                })}
                type="password"
                id="passwordConfirm"
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
              onClick={handleSubmit(handleResetPassword)}
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
