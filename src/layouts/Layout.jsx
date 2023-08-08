import { styled } from "@mui/material/styles";
import { Sidebar } from "../features/Sidebar/components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import TopBar from "../features/TopBar/components/TopBar";
import { Grid } from "@mui/material";
import { Outlet, useLocation } from "react-router";

import Cookies from "universal-cookie";
import useAuth from "../common/hooks/useAuth";

const SIDE_NAV_WIDTH = 255;
const TABLET_SIDE_NAV_WIDTH = 80;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: TABLET_SIDE_NAV_WIDTH,
  },
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled(Grid)(({ theme }) => ({
  marginTop: "16px !important",
  [theme.breakpoints.down("sm")]: {
    padding: "0 10px 0 10px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "0 13px 0 13px",
    maxWidth: "845px",
    margin: "0 auto",
  },
  [theme.breakpoints.up("xl")]: {
    padding: "0",
    maxWidth: "1076px",
    margin: "0 auto",
  },
}));

export const Layout = () => {
  const cookies = new Cookies();

  const pathname = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const { verifyToken } = useAuth();

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  useEffect(() => {
    verifyToken(cookies.get("token"));
  }, []);

  return (
    <>
      <Sidebar
        onHamburgerClick={() => setOpenNav(!openNav)}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />

      <LayoutRoot>
        <LayoutContainer container direction="column" gap={3}>
          <Grid item>
            <TopBar
              onHamburgerClick={() => setOpenNav(!openNav)}
              open={openNav}
            />
          </Grid>
          <Grid item>
            <Outlet />
          </Grid>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
