/*import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Typography, Container, CssBaseline, Box, Grid, Link, TextField } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import logo from "./features/Login/components/logo.jpg";
import Theme from "./theme/Theme";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
 
    [theme.breakpoints.only('md')]: {
    logoImage: {
      marginTop: '20px',
      width: '40px',
      height: '27px',
      
    },
    loginTitle: {
      marginLeft: '-9px',
      width: '100%',
      height: '26px',
      fontSize: '14px',
      lineHeight: '150%',
      
    },
    loginSubtitle: {
      width: '150px',
      height: '18px',
      fontSize: '10px',
      lineHeight: '150%',
    },
    loginInput: {
      width: '280px',
      height: '38px',
    },
    loginButton: {
      width: '280px',
      height: '38px',
      fontSize: '14px',
    },
    loginLink: {
     // width: '130px',
      //height: '15px',
      //fontSize: '10px',
      color: '#757575',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '-0.264px',
      width: '158px',
      height: '17px',
      flexShrink: 0,
    },
    signupLink: {
      width: '75px',
      height: '8px',
      marginRight: '15px',
      fontSize: '10px',
    },
  },
  
}));

function App() {
  const handleSubmit = (event) => {
    // Handling form submission logic
    event.preventDefault();
    // ...
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box className={classes.logoContainer} sx={{width:'100%', margin:'auto'}}>
          <img src={logo} alt="Login" className={classes.logoImage} sx={{width:'100%', margin:'auto'}}  />
          <Typography variant="h6" className={classes.loginTitle} sx={{width:'100%', margin:'auto'}}>Parking</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              margin: 'auto',
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
              margin="normal"
              border="none"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes.loginInput}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              className={classes.loginInput}
            />

            <Button
              type="submit"
              variant="contained"
              className={classes.loginButton}
            >
              Log In
            </Button>

            <Grid container>
              <Grid item xs>
                <Typography variant="body2" className={classes.loginLink}>
                  Don't have an account?
                </Typography>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" className={classes.signupLink}>
                  {"Sign up here"}
                </Link>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;*/
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
// import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
// import logo from "./features/Login/components/logo.jpg";
// import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme/Theme";
import {makeStyles} from '@mui/styles';
import loginimage from "./features/Login/components/loginimg.svg";
// const useStyles = makeStyles((theme) => ({
//   [theme.breakpoints.only("md")]: {
//     logoImage: {
//       marginTop: "20px",
//       width: "40px",
//       height: "27px",
//     },
//     loginTitle: {
//       marginLeft: "-9px",
//       width: "100%",
//       height: "26px",
//       fontSize: "14px",
//       lineHeight: "150%",
//     },
//     loginSubtitle: {
//       width: "150px",
//       height: "18px",
//       fontSize: "10px",
//       lineHeight: "150%",
//     },
//     loginInput: {
//       width: "280px",
//       height: "38px",
//     },
//     loginButton: {
//       width: "280px",
//       height: "38px",
//       fontSize: "14px",
//     },
//     loginLink: {
//       // width: '130px',
//       //height: '15px',
//       //fontSize: '10px',
//       color: "#757575",
//       fontFamily: "Montserrat",
//       fontSize: "12px",
//       fontStyle: "normal",
//       fontWeight: 500,
//       lineHeight: "150%",
//       letterSpacing: "-0.264px",
//       width: "158px",
//       height: "17px",
//       flexShrink: 0,
//     },
//     signupLink: {
//       width: "75px",
//       height: "8px",
//       marginRight: "15px",
//       fontSize: "10px",
//     },
//   },
// }));




// const customTheme = createTheme({
//   overrides: {
//     MuiOutlinedInput: {
//       notchedOutline: {
//         border: "2px solid #000", // Replace #000 with your desired border color
//       },
//     },
//   },
// });
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

const LoginImage = styled("img")(({theme}) => ({
  [theme.breakpoints.down("md")]: {
    width: "296px",
    height: "247px",
    flexShrink: 0,
    marginLeft:"-30px",
   // marginTop: "0.8rem"
  },
}));

const LoginToOurPage = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    width: "169px",
    height: "34px",
    fontSize:"18px",
    marginLeft:"-185px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.342px"
  // display: inlineBlock, 
    // textAlign: center, 
    // float: left,
  },
}));

const EnterCredentials = styled(Typography)(({theme}) => ({
  width: "194px",
height:"22px",
flexShrink: 0,
color: "#757575",
fontSize: "12px",
fontWeight: "400",
lineHeight: "150%",
letterSpacing: "-0.228px",
marginLeft:"-153px"
}));
 
const LoginInput = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "332px",
    height: "45px",
    //boxshadow:"0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
    boxShadow: theme.input.boxShadow,

  },
}));
 
const styles = makeStyles({
  inputClass: {
    '.MuiOutlinedInput-notchedOutline': {
      borderStyle: 'none',
    }
  }
});


const LoginButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "332px",
    height: "45px",
    fontSize: "16px",
    marginTop: "20px",
    marginBottom: "10px"
  },
}));
 
const LoginLink = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    // width: "130px",
    //height: '15px',
    color: "#757575",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.264px",
    width: "158px",
    height: "8px",
    flexShrink: 0,
  },
}));
 
const SignupLink = styled(Link)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "89px",
    height: "17px",
    marginRight: "15px",
    fontSize: "12px",
    color: theme.palette.primary.main,
    fontWeight: 500,
    lineHeight:"150%",
    letterSpacing: "-0.264px",
    textDecorationLine: "underline",
    marginBottom: "-50px",
  },
}));
 
function Login() {
  //   const classes = useStyles();
  const handleSubmit = (event) => {
    // Handling form submission logic
    event.preventDefault();
    // ...
  };

  const classes = styles();

  return (
    <>
     <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          //   className={classes.logoContainer}
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
          {/* <Typography
            variant="h6"
            // className={classes.loginTitle}
            sx={{ width: "100%", margin: "auto" }}
          >
            Parking
          </Typography> */}
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
            <LoginImage
            src={loginimage}
            alt="Login"
          />

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              
              <LoginToOurPage variant="p">Login to our app</LoginToOurPage>
              <br/>
              <EnterCredentials variant="p">Enter username and password</EnterCredentials>
              <LoginInput
                margin="normal"
                border="none"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { fontSize: "12px" }, 
                }}
                className={classes.inputClass}
              />
              {/* <TextField
                margin="normal"
                border="none"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                // className={classes.loginInput}
              /> */}
            

              <LoginInput
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus 
                sx={{borderStyle:"none"}}
                InputLabelProps={{
                  style: { fontSize: "12px" }, 
                }}
              />
 
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                // className={classes.loginInput}
              /> */}
 
              <LoginButton type="submit" variant="contained">
                Log In
              </LoginButton>
 
              {/* <Button
                type="submit"
                variant="contained"
                // className={classes.loginButton}
              >
                Log In
              </Button> */}
 
              <Grid container>
                <Grid item xs>
                  <LoginLink variant="body2">
                    Don&apos;t have an account?
                  </LoginLink>
                  {/* <Typography
                    variant="body2"
                    //   className={classes.loginLink}
                  >
                    Don't have an account?
                  </Typography> */}
                </Grid>
                <Grid item>
                  <SignupLink href="#" variant="body2" sx={{position:"relative", bottom:"6px"}}>
                    Sign up here
                  </SignupLink>
                  {/* <Link
                    href="#"
                    variant="body2"
                    //   className={classes.signupLink}
                  >
                    {"Sign up here"}
                  </Link> */}
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
 
export default Login;