import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  CssBaseline,
  Box,
  Grid,
  TextField,
  useMediaQuery,
  Link,
  styled,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import loginimage from "../assets/login-illustration.svg";
import { useState } from "react";
import useAuth from "../common/hooks/useAuth";

import { toastSuccess, toastError } from "../common/utils/toasts";

import Cookies from "universal-cookie";

const Container = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "0 25px 0 25px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "20px 25px 0 25px !important",
  },
  [theme.breakpoints.up("md")]: {
    padding: "20px 0 60px 0",
  },
}));

const FormItem = styled(Grid)(() => ({
  maxWidth: "400px !important",
}));

const Logo = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(5),
    width: "50px",
    height: "35px",
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: "60px",
    width: "60px",
    height: "45px",
  },
}));

const LoginImage = styled("img")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    width: "70%",
  },
}));

function Login() {
  const cookies = new Cookies();

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const { login, verifyToken } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    // Handling form submission logic
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    if (email === "" || password === "") {
      setEmailError(email === "" ? "Email field is required" : "");
      setPasswordError(password === "" ? "Password field is required" : "");
    } else {
      try {
        await login(email, password).then((res) => {
          const toastId = "login-success";

          toastSuccess(res.data.message, { toastId });

          navigate("/", { replace: true });
        });
      } catch (err) {
        const toastId = "login-error";

        toastError(err, { toastId });
      }
    }
  };

  if (verifyToken(cookies.get("token"))) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <CssBaseline />

      <Container container justifyContent={mdDown ? "center" : "start"}>
        <Grid item display="flex" alignItems="baseline" justifyContent="center">
          <RouterLink to="/">
            <Logo
              src="https://iwconnect.com/wp-content/uploads/2020/12/Logo-final-with-connect50px.png"
              alt="IWCLogo"
            />
          </RouterLink>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          >
            Parking
          </Typography>
        </Grid>
      </Container>

      <Container
        container
        direction={mdDown ? "column" : "row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item textAlign="center" sm={6}>
          <LoginImage src={loginimage} alt="Login" />
        </Grid>
        <FormItem item sm={6}>
          <Typography variant={mdDown ? "subtitle2" : "h6"}>
            Login to our app
          </Typography>
          <Typography variant={mdDown ? "caption" : "body2"}>
            Enter your email and password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              sx={{ mt: 2 }}
              label="Email"
              onChange={handleEmailInput}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              value={email}
              error={emailError ? true : false}
              helperText={emailError ?? ""}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="password"
              value={password}
              error={passwordError ? true : false}
              helperText={passwordError ?? ""}
              fullWidth
            />
            <Button
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Box>
          <Grid item mt={1} display="flex">
            <Typography variant={mdDown ? "caption" : "body2"}>
              Don&apos;t have an account?
            </Typography>
            <Link
              p
              pt={0}
              variant={mdDown ? "caption" : "body2"}
              component={RouterLink}
              to="/signup"
            >
              Sign up here
            </Link>
          </Grid>
        </FormItem>
      </Container>
    </>
  );
}

export default Login;
