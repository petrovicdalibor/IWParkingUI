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
    flexShrink: 0,
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
    favorites: {
      main: "#393939",
      accent: "#FF8F00",
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
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
          borderRadius: "10px !important",
          border: "1px solid #ECECEC",
          "&:hover": {
            border: "1px solid #C5C5C5",
          },
          transition: theme.transitions.create("border", {
            duration: theme.transitions.duration.shorter,
          }),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px !important",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: "none",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
            border: "1px solid #B1B1B1",
          },
          transition: theme.transitions.create("border", {
            duration: theme.transitions.duration.shorter,
          }),
        },
        input: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
