import { Box, Divider, Paper, Typography, Container } from "@mui/material";
import InputItem from "../../components/inputItem/InputItem";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "../../components/button/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Login = () => {
  const {
    register,
    // handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
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
            padding: "36px 60px 64px",
            margin: "auto",
          }}
        >
          <form className={cx("login-form")}>
            <Typography
              variant="h2"
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
              <InputItem
                name="email"
                register={register}
                type="email"
                label="Email address *"
                placeholder=""
              />
              <InputItem
                name="password"
                register={register}
                type="text"
                label="Password *"
                placeholder=""
              />
            </Box>
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
                icon={<ArrowRightAltIcon sx={{ fontSize: "20px" }} />}
                type="submit"
              />
              <Link
                className={cx("forgot-password__link")}
                to="/forgot-password"
              >
                Forgot Your Password?
              </Link>
            </Box>
            <Divider />
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
