import { useState } from "react";
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
  Hidden,
  Collapse,
  Alert,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SignupImage from "../assets/signup-illustration.svg";

import Cookies from "universal-cookie";
import useAuth from "../common/hooks/useAuth";

// import AuthVerify from "../common/utils/AuthVerify";

import CloseIcon from "@mui/icons-material/Close";
import {
  confirmPasswordValidator,
  passwordValidator,
} from "../common/utils/validators";

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
  const cookies = new Cookies();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const { signUp, verifyToken } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("User");

  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const handlePhoneChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    // Handling form submission logic
    e.preventDefault();
    console.log(name, surname, email);

    if (
      name === "" ||
      surname === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      phone === "" ||
      role === ""
    ) {
      setError("All fields are required.");
      setErrorOpen(true);
    } else if (passwordValidator(password)) {
      setError(passwordValidator(password));
      setErrorOpen(true);
    } else if (confirmPasswordValidator(password, confirmPassword)) {
      setError(confirmPasswordValidator(password, setPassword));
      setErrorOpen(true);
    } else {
      try {
        await signUp(
          name,
          surname,
          email,
          password,
          confirmPassword,
          phone,
          role
        ).then(() => {
          navigate("/login", { replace: true });
        });
      } catch (err) {
        setError(err);
        setErrorOpen(true);
      }
    }
  };

  if (verifyToken(cookies.get("token"))) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {/* <AuthVerify /> */}
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
          <Box component="form" onSubmit={handleSubmit} noValidate mt={2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Sign up as
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <FormControlLabel
                  value="User"
                  control={<Radio size="small" />}
                  label="User"
                />
                <FormControlLabel
                  value="Owner"
                  control={<Radio size="small" />}
                  label="Owner"
                />
              </RadioGroup>
            </FormControl>
            <Box display={mdDown ? "block" : "flex"} gap={2}>
              <Grid item>
                <TextField
                  sx={{ mt: 2 }}
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                  size={mdDown ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  value={name}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ mt: 2 }}
                  label="Surname"
                  onChange={(e) => setSurname(e.target.value)}
                  variant="filled"
                  size={mdDown ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  value={surname}
                  fullWidth
                />
              </Grid>
            </Box>
            <TextField
              sx={{ mt: 2 }}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="email"
              value={email}
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
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              label="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="password"
              value={confirmPassword}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              label="Phone number"
              onChange={handlePhoneChange}
              variant="filled"
              size={mdDown ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              value={phone}
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
