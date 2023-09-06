/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Divider, Paper, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { REGISTER_USER } from "../../graphql/mutation/User";
import styles from "./Register.module.scss";

interface formValues {
  username: string;
  email: string;
  password: string;
}
const cx = classNames.bind(styles);
const Register = () => {
  const {
    register: registerInput,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formValues>();
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER_USER);
  const handleRegister: SubmitHandler<formValues> = async (
    data: formValues
  ) => {
    const res = await register({ variables: { registerInput: data } });
    if (res.data.register.code === 200) {
      navigate("/login");
    } else {
      setError("email", { type: "error", message: res.data.register?.message });
    }
  };
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
          margin: "116px 16px",
          maxWidth: "100%",
        }}
      >
        <form
          className={cx("login-form")}
          onSubmit={handleSubmit(handleRegister)}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: "20px", textAlign: "center", lineHeight: "2.1" }}
          >
            Sign Up
          </Typography>
          <Divider
            sx={{
              borderBottomWidth: "unset",
              borderColor: "var(--color-primary)",
              marginBottom: "20px",
            }}
          />
          <Box>
            <div className={cx("form-group")}>
              <label htmlFor="username">Username</label>
              <input
                {...registerInput("username", {
                  required: { value: true, message: "Username is required" },
                })}
                type="username"
                id="username"
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="email">Email</label>
              <input
                {...registerInput("email", {
                  required: { value: true, message: "Email is required" },
                })}
                type="email"
                id="email"
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="password">Password</label>
              <input
                {...registerInput("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
                type="password"
                id="password"
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
              title="REGISTER"
              onClick={() => {}}
              rightIcon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
            />
            <Link className={cx("forgot-password__link")} to="/forget-password">
              Forgot Your Password?
            </Link>
          </Box>
          <Divider />
          <Box sx={{ marginTop: "24px" }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "14px",
                fontFamily: "Jost",
                color: "#777",
                textAlign: "center",
              }}
            >
              Have an account?
              <Link to="/login" className={cx("sign-up_btn")}>
                Sign in for Molla
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
