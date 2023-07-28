import { createTheme } from "@mui/material/styles";

import { getGridTheme } from "./Grid";

let theme = createTheme({
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),

    button: {
      textTransform: "none",
    },
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
  // components: {
  //   // Name of the component
  //   MuiGrid: getGridTheme(theme),
  //   MuiInputBase: {
  //     styleOverrides: {
  //       root: {
  //         boxShadow: "0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
  //         borderRadius: "10px !important",
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: "10px !important",
  //       },
  //     },
  //   },
  // },
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
    // Name of the component
    MuiGrid: getGridTheme(theme),
    MuiInputBase: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
          borderRadius: "10px !important",
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
  },
  // components: {
  //   // Name of the component
  //   MuiGrid: {
  //     styleOverrides: {
  //       // Name of the slot
  //       container: {
  //         // paddingTop: "40px",
  //         [theme.breakpoints.down("sm")]: {
  //           padding: "0 10px 0 10px",
  //         },
  //         [theme.breakpoints.up("sm")]: {
  //           padding: "0 13px 0 13px",
  //           maxWidth: "845px",
  //           margin: "0 auto",
  //         },
  //         [theme.breakpoints.up("lg")]: {
  //           padding: "0",
  //           maxWidth: "1076px",
  //           margin: "0 auto",
  //         },
  //       },
  //     },
  //   },
  //   MuiInputBase: {
  //     styleOverrides: {
  //       root: {
  //         boxShadow: "0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
  //         borderRadius: "10px !important",
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: "10px !important",
  //       },
  //     },
  //   },
  // },
});

export default theme;
