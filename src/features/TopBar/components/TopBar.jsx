import PropTypes from "prop-types";
import { useState } from "react";

import SearchInput from "../../../common/components/Search/components/SearchInput";

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
import { LuLogOut } from "react-icons/lu";
import { BsPersonGear, BsXLg, BsChevronDown } from "react-icons/bs";
// import { FaBars } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { stringAvatar } from "../../../common/utils/AvatarUtil";

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

const HamburgerBox = styled(Box)(() => ({
  cursor: "pointer",
  position: "relative",
  justifyContent: "center",
  zIndex: 9999,
}));

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F1F1F1",
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: 0,
  borderRadius: "10px",
  height: "58px",
}));

const TopBar = ({ onHamburgerClick, open }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const hamburger = open ? (
    <BsXLg size={24} color="#6A6A6A" onClick={onHamburgerClick} />
  ) : (
    <RxHamburgerMenu size={24} color="#6A6A6A" onClick={onHamburgerClick} />
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
            <HamburgerBox justifyContent={"center"} alignContent={"center"}>
              {hamburger}
            </HamburgerBox>
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
                height: "58px",
                padding: 0,
                fontSize: "0",
                textAlign: "left",
              }}
              onClick={handleOpenUserMenu}
            >
              <UserInfoBox>
                <UserAvatar {...stringAvatar("Jane Doe")} />
                <Hidden mdDown>
                  <Box>
                    <Typography
                      px
                      py={0}
                      color={"#424343"}
                      variant="subtitle2"
                      lineHeight={"14px"}
                    >
                      Jane Doe
                    </Typography>
                    <Typography px variant="caption" lineHeight={"14px"}>
                      jane@example.com
                    </Typography>
                  </Box>
                </Hidden>
                <Box ml={1}>
                  <BsChevronDown size={20} />
                </Box>
              </UserInfoBox>
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
