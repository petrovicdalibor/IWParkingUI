import PropTypes from "prop-types";
import { useState } from "react";

import SearchInput from "../../common/components/Search/SearchInput";

import {
  Avatar,
  Box,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { LuAlignJustify, LuLogOut } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { BsPersonGear } from "react-icons/bs";

const CustomGrid = styled(Grid)(() => ({
  paddingTop: "30px !important",
}));

const LogoBox = styled(Box)(() => ({
  width: "49.91px",
  position: "absolute",
  left: 0,
  right: 0,
  margin: "auto",
  marginTop: "45px",
  zIndex: 9999,
}));

const LogoImage = styled("img")(() => ({
  height: "32px",
}));

const UserAvatar = styled(Avatar)(() => ({
  fontSize: ".9rem",
  width: "32px",
  height: "32px",
}));

const TopBar = ({ onHamburgerClick, open }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const hamburger = open ? (
    <GrClose size={24} onClick={onHamburgerClick} />
  ) : (
    <LuAlignJustify size={26} onClick={onHamburgerClick} />
  );
  return (
    <>
      <Hidden smUp>
        <LogoBox>
          <LogoImage src="https://iwconnect.com/wp-content/uploads/2020/12/Logo-final-with-connect50px.png" />
        </LogoBox>
      </Hidden>
      <CustomGrid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Hidden smUp>
          <Grid item xs={"auto"}>
            <Box
              sx={{
                cursor: "pointer",
                position: "relative",
                justifyContent: "center",
                zIndex: 9999,
              }}
            >
              {hamburger}
            </Box>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={"auto"}>
            <SearchInput />
          </Grid>
        </Hidden>
        <Grid item xs={"auto"}>
          <Box>
            <IconButton
              sx={{
                height: "63px",
                padding: 0,
                fontSize: "0",
                textAlign: "left",
              }}
              onClick={handleOpenUserMenu}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F1F1F1",
                  px: 2,
                  margin: 0,
                  borderRadius: "10px",
                  height: "63px",
                }}
              >
                <UserAvatar {...stringAvatar("Jane Doe")} />
                <Hidden mdDown>
                  <Box>
                    <Typography
                      px
                      py={0}
                      //   margin="0"
                      color={"#424343"}
                      variant="subtitle2"
                      sx={{
                        lineHeight: "14px",
                      }}
                    >
                      Jane Doe
                    </Typography>
                    <Typography
                      px
                      variant="caption"
                      sx={{
                        lineHeight: "14px",
                      }}
                    >
                      jane@example.com
                    </Typography>
                  </Box>
                </Hidden>
              </Box>
            </IconButton>
            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Box>
                  <BsPersonGear size={20} />
                </Box>
                <Typography px={2} textAlign="center">
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Box>
                  <LuLogOut size={20} />
                </Box>
                <Typography px={2} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </CustomGrid>
      <Hidden smUp>
        <SearchInput />
      </Hidden>
    </>
  );
};

TopBar.propTypes = {
  onHamburgerClick: PropTypes.func,
  open: PropTypes.bool,
};

export default TopBar;
