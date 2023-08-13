/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Container, Paper, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./ForgetPassword.module.scss";

import { useMutation } from "@apollo/client";
import { useAuth } from "../../context/UserContext";
import { LOGIN_USER } from "../../graphql/mutation/User";

const cx = classNames.bind(styles);
interface formValues {
  email: string;
}
const ForgetPassword = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN_USER);
  const { setToken, setIsAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    // watch,
    formState: { errors },
  } = useForm<formValues>();

  const handleLogin: SubmitHandler<formValues> = async (data: formValues) => {
    const res = await login({ variables: { loginInput: data } });
    if (res.data.login.code === 200) {
      setIsAuthenticated(true);
      setToken(res.data.login.accessToken);
      navigate("/");
    } else {
      setError("email", { type: "error", message: res.data.login?.message });
    }
  };
  return (
    <Box
      sx={{
        backgroundImage: `url("../../../../src/assets/images/login-bg.jpg")`,
        paddingTop: "50%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
      >
        <Paper
          sx={{
            maxWidth: "575px",
            padding: "36px 60px 36px",
            margin: "auto",
          }}
        >
          <form
            className={cx("login-form")}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "14px",
                lineHeight: "1.5",
                color: "#777",
                fontFamily: "Jost",
                fontWeight: "500",
              }}
            >
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </Typography>
            <Box sx={{ marginTop: "16px" }}>
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
            {(errors as any)[Object.keys(errors)[0]]?.message && (
              <div className={cx("error")}>
                <span className={cx("error-heading")}>Error:</span>
                <span className={cx("error-title")}>
                  {(errors as any)[Object.keys(errors)[0]]?.message}
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
                onClick={() => {}}
                rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                type="submit"
              />
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgetPassword;
