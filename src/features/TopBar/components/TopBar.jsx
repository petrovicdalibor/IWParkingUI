import PropTypes from "prop-types";

import { useContext, useState } from "react";

import SearchInput from "../../../common/components/Search/components/SearchInput";

import {
  Avatar,
  Box,
  Button,
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
import { RxHamburgerMenu } from "react-icons/rx";
import { stringAvatar } from "../../../common/utils/AvatarUtil";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authProvider";
import useAuth from "../../../common/hooks/useAuth";

const CustomGrid = styled(Grid)(({ theme }) => ({
  paddingTop: "30px !important",
  [theme.breakpoints.only("xs")]: {
    paddingTop: "0 !important",
  },
}));

const LogoBox = styled(Box)(() => ({
  width: "49.91px",
  position: "absolute",
  left: 0,
  right: 0,
  margin: "auto",
  marginTop: "10px",
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
  margin: "0",
  borderRadius: "10px",
  height: "58px",
}));

const TopBar = ({ onHamburgerClick, open }) => {
  const userContext = useContext(AuthContext);
  const { logout } = useAuth();
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
          {userContext.isFetchingUser === false ? (
            userContext.isLoggedIn === true ? (
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
                    <UserAvatar
                      {...stringAvatar(
                        `${userContext.user.name} ${userContext.user.surname}`
                      )}
                    />
                    <Hidden mdDown>
                      <Box>
                        <Typography
                          px
                          py={0}
                          color={"#424343"}
                          variant="subtitle2"
                          lineHeight={"14px"}
                        >
                          {`${userContext.user.name} ${userContext.user.surname}`}
                        </Typography>
                        <Typography px variant="caption" lineHeight={"14px"}>
                          {userContext.user.email}
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
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleCloseUserMenu}
                  >
                    <Box>
                      <BsPersonGear size={20} />
                    </Box>
                    <Typography px={2} textAlign="center">
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      logout();
                    }}
                  >
                    <Box>
                      <LuLogOut size={20} />
                    </Box>
                    <Typography px={2} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Grid item gap={1} display="flex">
                <Link to="/signup">
                  <Grid item>
                    <Button variant="outlined" color="secondary">
                      Sign up
                    </Button>
                  </Grid>
                </Link>
                <Grid item>
                  <Link to="/login">
                    <Button variant="contained" disableElevation>
                      Login
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            )
          ) : (
            <></>
          )}
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
