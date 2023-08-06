import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Typography,
  CssBaseline,
  Box,
  Grid,
  TextField,
  useMediaQuery,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import loginimage from "../assets/login-illustration.svg";

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
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    // Handling form submission logic
    event.preventDefault();
    // ...
  };

  return (
    <>
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
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              sx={{ mt: 2 }}
              label="Email"
              // onChange={handleUsernameChange}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              // value={searchCondition}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              label="Password"
              // onChange={handleUsernameChange}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="password"
              // value={searchCondition}
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
