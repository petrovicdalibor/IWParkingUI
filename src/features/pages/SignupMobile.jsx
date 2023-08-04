import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../../theme/Theme.js";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";
import axios from "../../api/axios.js";

const LogoImage = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: "20px",
    width: "47px",
    height: "32px",
  },
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    width: "77px",
    height: "30px",
  },
}));

const SignUpNow = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    width: "169px",
    height: "34px",
    fontSize: "18px",
    marginLeft: "-222px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.342px",
  },
}));

const FillInText = styled(Typography)(() => ({
  width: "194px",
  height: "22px",
  flexShrink: 0,
  color: "#9C9C9C",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "150%",
  letterSpacing: "-0.228px",
  marginLeft: "-75px",
  marginRight: "15px",
}));

const SignUpAs = styled(Typography)(() => ({
  width: "194px",
  height: "22px",
  flexShrink: 0,
  color: "#9C9C9C",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "150%",
  letterSpacing: "-0.228px",
  marginLeft: "-105px",
  marginRight: "15px",
}));

const NameInput = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "160px",
    height: "45px",
    marginLeft: "-15px",
    marginRight: "10px",
    boxShadow: theme.input.boxShadow,
  },
}));

const SurnameInput = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "160px",
    height: "45px",
    marginRight: "-15px",
    boxShadow: theme.input.boxShadow,
  },
}));

const LoginInput = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "332px",
    height: "45px",
    boxShadow: theme.input.boxShadow,
  },
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "332px",
    height: "45px",
    fontSize: "16px",
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

const Or = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    color: "#9C9C9C",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.264px",
    width: "332px",
    height: "8px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 px",
    marginLeft: "30px",
  },
}));

const LoginHereLink = styled(Link)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "332px",
    height: "17px",
    marginRight: "15px",
    fontSize: "12px",
    color: theme.palette.primary.main,
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.264px",
    textDecorationLine: "underline",
    marginBottom: "-50px",
  },
}));

const USER_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Signup() {
  const [role, setRole] = useState("User");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirm(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      name,
      surname,
      username,
      password,
      confirmPassword,
      phone,
      role,
    });

    try {
      const response = await axios.post(
        "/api/Auth/Register",
        JSON.stringify({
          name,
          surname,
          username,
          password,
          confirmPassword,
          phone,
          role,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
      // errRef.current.focus();
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <LogoImage
              src="https://iwconnect.com/wp-content/uploads/2020/12/Logo-final-with-connect50px.png"
              alt="Login"
            />
            <LoginTitle variant="h6">Parking</LoginTitle>
          </Box>
          <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                margin: "auto",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <SignUpNow variant="p">Sign up now</SignUpNow>
                <br />
                <div>
                  <FillInText variant="p">
                    Fill in the form below to get instant access
                  </FillInText>
                </div>
                <br />
                <br />
                <FormLabel
                  component="legend"
                  sx={{
                    position: "absolute",
                    left: "40px",
                    marginTop: "-20px",
                  }}
                >
                  Sign up as:
                </FormLabel>
                <RadioGroup
                  aria-label="options"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    sx={{ marginLeft: "15px" }}
                    value="User"
                    control={
                      <Radio
                        icon={
                          <RadioButtonUnchecked sx={{ fontSize: "14px" }} />
                        }
                        checkedIcon={
                          <RadioButtonChecked sx={{ fontSize: "14px" }} />
                        }
                        sx={{ color: "#9C9C9C" }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "14px", color: "#9C9C9C" }}>
                        User
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    sx={{ marginLeft: "10px" }}
                    value="Owner"
                    control={
                      <Radio
                        icon={
                          <RadioButtonUnchecked sx={{ fontSize: "14px" }} />
                        }
                        checkedIcon={
                          <RadioButtonChecked sx={{ fontSize: "14px" }} />
                        }
                        sx={{ color: "#9C9C9C" }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "14px", color: "#9C9C9C" }}>
                        Owner
                      </Typography>
                    }
                  />
                </RadioGroup>
                <NameInput
                  margin="normal"
                  border="none"
                  required
                  id="name"
                  label="Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  autoFocus
                  sx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  // className={classes.inputClass}
                  variant="standard"
                />
                <SurnameInput
                  margin="normal"
                  border="none"
                  required
                  name="surname"
                  onChange={(e) => setSurname(e.target.value)}
                  label="Surname"
                  id="surname"
                  autoComplete="surname"
                  autoFocus
                  ssx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  // className={classes.inputClass}
                  variant="standard"
                />
                <LoginInput
                  margin="normal"
                  border="none"
                  required
                  id="username"
                  label="Email Address"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  sx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  // className={classes.inputClass}
                  variant="standard"
                />
                <LoginInput
                  margin="normal"
                  required
                  border="none"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  sx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  // className={classes.inputClass}
                  variant="standard"
                />
                <LoginInput
                  margin="normal"
                  required
                  border="none"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm password"
                  type="password"
                  id="cpassword"
                  autoFocus
                  sx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  // className={classes.inputClass}
                  variant="standard"
                />
                <LoginInput
                  margin="normal"
                  required
                  border="none"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  label="Phone number"
                  type="tel"
                  id="phone"
                  autoComplete="off"
                  pattern="07[0-9]-[0-9]{3}-[0-9]{3}"
                  sx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  // className={classes.inputClass}
                  variant="standard"
                />
                <SignUpButton type="submit" variant="contained">
                  Sign up
                </SignUpButton>
                <br />
                <Grid container>
                  <Grid item xs>
                    <Or variant="body2">or</Or>
                  </Grid>
                  <Grid item>
                    <LoginHereLink
                      href="#"
                      variant="body2"
                      sx={{
                        position: "relative",
                        top: "5px",
                        left: "23px",
                        display: "block",
                      }}
                    >
                      Log in here
                    </LoginHereLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Signup;
