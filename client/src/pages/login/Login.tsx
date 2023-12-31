/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Divider, Paper, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./Login.module.scss";

import { useMutation } from "@apollo/client";
import { useAuth } from "../../context/UserContext";
import { LOGIN_USER } from "../../graphql/mutation/User";
import { useEffect } from "react";

const cx = classNames.bind(styles);
interface formValues {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          me() {
            return data.login;
          },
        },
      });
    },
  });
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
      localStorage.setItem("user", JSON.stringify(res.data.login.user));
      navigate(location.state?.pathname ? location.state?.pathname : "/");
    } else {
      setError("email", { type: "error", message: res.data.login?.message });
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
          margin: "116px 16px",
          maxWidth: "100%",
        }}
      >
        <form className={cx("login-form")} onSubmit={handleSubmit(handleLogin)}>
          <Typography
            variant="h1"
            sx={{ fontSize: "20px", textAlign: "center", lineHeight: "2.1" }}
          >
            Sign In
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
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
                type="email"
                id="email"
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
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
              title="LOG IN"
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
              Don't have an account?
              <Link to="/register" className={cx("sign-up_btn")}>
                Sign up for Molla
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
