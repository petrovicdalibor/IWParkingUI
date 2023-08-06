import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { Sidebar } from "../features/Sidebar/components/Sidebar";
import { Sidebar } from "../../features/";

import { useCallback, useEffect, useState } from "react";
import TopBar from "../features/TopBar/components/TopBar";

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

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = ({ children }) => {
  const pathname = window.location.pathname;
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(true);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
      console.log(pathname);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <Sidebar
        onHamburgerClick={() => setOpenNav(!openNav)}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />

      <LayoutRoot>
        <TopBar onHamburgerClick={() => setOpenNav(!openNav)} open={openNav} />
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};