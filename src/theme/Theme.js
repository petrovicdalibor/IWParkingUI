import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),

    button: {
      textTransform: "none",
    },
  },

  input: {
    borderRadius: "10px",
    background: "#FFF",
    boxShadow: "0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
    width: "332px",
    height: "45px",
    flexShrink: 0
  },

  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#CF0018",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2563EB",
      contrastText: "#FFFFFF",
    },
    accent: {
      main: "#000",
      contrastText: "#000000",
    },
    success: {
      main: "#059669",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#DC2626",
      contrastText: "#FFFFFF",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontSize: "1rem",

    h2: {
      color: "#2B2D2F",
      fontSize: "1.625rem",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    h3: {
      color: "#2B2D2F",
      fontSize: "1.25rem",
      fontWeight: 500,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.125rem",
      },
    },
  },
});

export default theme;
