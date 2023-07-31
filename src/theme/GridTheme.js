export const getGridTheme = (theme) => ({
  styleOverrides: {
    container: {
      [theme.breakpoints.down("sm")]: {
        padding: "0 10px 0 10px",
      },
      [theme.breakpoints.up("sm")]: {
        padding: "0 13px 0 13px",
        maxWidth: "845px",
        margin: "0 auto",
      },
      [theme.breakpoints.up("lg")]: {
        padding: "0",
        maxWidth: "1076px",
        margin: "0 auto",
      },
    },
  },
});
