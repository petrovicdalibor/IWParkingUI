import PropTypes from "prop-types";
import { Box, Drawer, Stack, useMediaQuery } from "@mui/material";
import { SidebarItem } from "./SidebarItem";

import { LuParkingCircle, LuAlignJustify } from "react-icons/lu";
import { BsCalendarEvent, BsStar } from "react-icons/bs";

export const Sidebar = ({ onClose, onHamburgerClick, open }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

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
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            display: "inline-flex",
            opacity:
              smUp === true && lgDown === true && open === false
                ? 0
                : open === false && smUp === true && lgDown === true
                ? 1
                : 1,
            justifyContent: "center",
            height: 32,
            width: 32,
            transition: (theme) =>
              theme.transitions.create("visibility", {
                duration: theme.transitions.duration.short,
              }),
          }}
        >
          <img
            src="https://iwconnect.com/wp-content/uploads/2020/12/Logo-final-with-connect50px.png"
            alt=""
          />
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            display: "block",
            position: "absolute",
            right: "25px",
            visibility: smUp === true && lgDown === true ? "visible" : "hidden",
            justifyContent: "center",
          }}
        >
          <LuAlignJustify size={26} onClick={onHamburgerClick} />
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
          <SidebarItem
            active={true}
            external={false}
            icon={<LuParkingCircle size={24} />}
            key={"Parking Lots"}
            path={"/"}
            title={"Parking Lots"}
          />
          <SidebarItem
            active={false}
            external={false}
            icon={<BsCalendarEvent size={24} />}
            key={"Reservations"}
            path={"/reservations"}
            title={"Reservations"}
            open={open}
          />
          <SidebarItem
            active={false}
            external={false}
            icon={<BsStar size={24} />}
            key={"Favorites"}
            path={"/favorites"}
            title={"Favorites"}
            open={open}
          />
        </Stack>
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
