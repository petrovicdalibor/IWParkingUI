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
  Hidden,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SignupImage from "../assets/signup-illustration.svg";

const Container = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "0 25px 0 25px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "20px 25px 0 25px !important",
  },
  [theme.breakpoints.up("md")]: {
    padding: "20px 0 0 0",
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
    width: "100%",
  },
}));

function Signup() {
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
        <Hidden mdDown>
          <Grid item textAlign="center" sm={6}>
            <LoginImage src={SignupImage} alt="Login" />
          </Grid>
        </Hidden>
        <FormItem item sm={6}>
          <Typography variant={mdDown ? "h6" : "h6"}>Sign up now</Typography>
          <Typography variant={mdDown ? "caption" : "body2"}>
            Fill in the form below to get instant access
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box display={mdDown ? "block" : "flex"} gap={2}>
              <Grid item>
                <TextField
                  sx={{ mt: 2 }}
                  label="Name"
                  // onChange={handleUsernameChange}
                  variant="filled"
                  size={mdDown ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  // value={searchCondition}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ mt: 2 }}
                  label="Surname"
                  // onChange={handleUsernameChange}
                  variant="filled"
                  size={mdDown ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  // value={searchCondition}
                  fullWidth
                />
              </Grid>
            </Box>
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
            <TextField
              sx={{ mt: 2 }}
              label="Confirm password"
              // onChange={handleUsernameChange}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="password"
              // value={searchCondition}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              label="Phone number"
              // onChange={handleUsernameChange}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
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
              Sign up
            </Button>
          </Box>
          <Grid item mt={1} display="flex">
            <Typography variant={mdDown ? "caption" : "body2"}>
              Already have an account?
            </Typography>
            <Link
              p
              pt={0}
              variant={mdDown ? "caption" : "body2"}
              component={RouterLink}
              to="/login"
            >
              Login here
            </Link>
          </Grid>
        </FormItem>
      </Container>
    </>
  );
}

export default Signup;
