import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import { SidebarItem } from "./SidebarItem";

import { LuAlignJustify } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { BsBoxArrowRight, BsFillPersonPlusFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";

import {
  userItems,
  adminItems,
  ownerItems,
} from "../../../common/constants/navbarItems";
import { Link } from "react-router-dom";

const LogoImage = styled("img")(() => ({
  height: "32px",
  padding: "5px",
}));

export const Sidebar = ({ onClose, onHamburgerClick, open }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const userContext = useContext(AuthContext);

  const pathname = window.location.pathname;

  const hamburger = open ? <GrClose size={24} /> : <LuAlignJustify size={26} />;

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <Hidden smDown>
            <Link to="/">
              <LogoImage
                src="https://iwconnect.com/wp-content/uploads/2020/12/Logo-final-with-connect50px.png"
                alt=""
                sx={{
                  opacity:
                    smUp && lgDown && !open
                      ? 0
                      : !open && smUp && lgDown
                      ? 1
                      : 1,
                  transition: (theme) =>
                    theme.transitions.create("opacity", {
                      duration: theme.transitions.duration.short,
                    }),
                }}
              />
            </Link>
          </Hidden>

          <IconButton
            sx={{
              display: "block",
              position: "absolute",
              right: "16px",
              visibility: smUp && lgDown ? "visible" : "hidden",
            }}
            onClick={onHamburgerClick}
          >
            {hamburger}
          </IconButton>
        </Box>
      </Box>
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 12,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            alignItems: smDown ? "center" : "left",
          }}
        >
          {userContext.role === "User" || userContext.role === "" ? (
            userItems.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SidebarItem
                  active={active}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })
          ) : (
            <></>
          )}
          {userContext.role === "SuperAdmin" ? (
            adminItems.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SidebarItem
                  active={active}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })
          ) : (
            <></>
          )}
          {userContext.role === "Owner" ? (
            ownerItems.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SidebarItem
                  active={active}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })
          ) : (
            <></>
          )}
        </Stack>
        {!userContext.isLoggedIn ? (
          <Hidden mdUp>
            <Grid
              item
              gap={1}
              mt={4}
              display="flex"
              flexDirection={open ? "row" : "column"}
              alignItems="center"
              justifyContent="center"
            >
              <Link to="/signup">
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    {open ? (
                      <span>Sign up</span>
                    ) : (
                      <BsFillPersonPlusFill size={24} />
                    )}
                  </Button>
                </Grid>
              </Link>
              <Grid item>
                <Link to="/login">
                  <Button variant="contained" disableElevation>
                    {open ? <span>Login</span> : <BsBoxArrowRight size={24} />}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Hidden>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={true}
        PaperProps={{
          sx: {
            backgroundColor: "#F1F1F1",
            width: 255,
            overflow: "hidden",
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  if (smUp) {
    return (
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#F1F1F1",
            width: open ? "255px" : "80px",
            overflow: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="top"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#F1F1F1",
          height: "100%",
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  open: PropTypes.bool,
};
