import {
  Navigate,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Button,
  Typography,
  CssBaseline,
  Box,
  Grid,
  TextField,
  useMediaQuery,
  Link,
  Alert,
  Collapse,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import loginimage from "../assets/login-illustration.svg";
import { useContext, useState } from "react";
import useAuth from "../common/hooks/useAuth";

import Cookies from "universal-cookie";
import { emailValidator } from "../common/utils/validators";
import { AuthContext } from "../context/authProvider";
import AuthVerify from "../common/utils/AuthVerify";

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

  const userContext = useContext(AuthContext);

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login, verifyToken } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    // Handling form submission logic
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    if (emailValidator(email) !== "") {
      setError(emailValidator(email));
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }
    try {
      await login(email, password).then((res) => {
        const token = res.data.token;
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        cookies.set("token", token, {
          expires: new Date(decodedToken.exp * 1000),
        });

        userContext.setUser(decodedToken);
        userContext.setIsLoggedIn(true);

        navigate(from, { replace: true });
      });
    } catch (err) {
      setError(err);
      setErrorOpen(true);
    }
  };

  if (verifyToken(cookies.get("token"))) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <AuthVerify />
      <CssBaseline />

      {/* HEADER */}
      <Container container justifyContent={mdDown ? "center" : "start"}>
        <Grid item display="flex" alignItems="baseline" justifyContent="center">
          <Logo
            src="https://iwconnect.com/wp-content/uploads/2020/12/Logo-final-with-connect50px.png"
            alt="IWCLogo"
          />
          <Typography variant="h6">Parking</Typography>
        </Grid>
      </Container>

      {/* LOGIN FORM WITH IMAGE */}
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

          <Collapse in={errorOpen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 1 }}
            >
              {error}
            </Alert>
          </Collapse>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              sx={{ mt: 2 }}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              value={email}
              error={emailError ? true : false}
              helperText={emailError ? error : ""}
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
              helperText={passwordError ? "Password is required" : ""}
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
