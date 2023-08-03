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
import {makeStyles} from '@mui/styles';
import loginimage from "../Login/components/loginimg.svg";
import { BrowserRouter } from "react-router-dom";


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

    boxShadow: theme.components.boxShadow
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ width: "160px" }}
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{
                  style: { fontSize: "12px", marginLeft:"10px", marginTop:"3px" }, 
                }}
                className={classes.inputClass}
                variant="standard"
              />
           

              <LoginInput
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus 
                sx={{ width: "160px" }}
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{
                  style: { fontSize: "12px", marginLeft:"10px", marginTop:"3px" }, 
                }}
                variant="standard"
              />
 

              <LoginButton type="submit" variant="contained">
                Log In
              </LoginButton>
  
              <Grid container>
                <Grid item xs>
                  <LoginLink variant="body2">
                    Don&apos;t have an account?
                  </LoginLink>

                </Grid>
                <Grid item>
                  <SignupLink href="#" variant="body2" sx={{position:"relative", bottom:"6px"}}>
                    Sign up here
                  </SignupLink>

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
