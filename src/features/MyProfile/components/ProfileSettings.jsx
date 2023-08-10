import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { stringAvatar } from "../../../common/utils/AvatarUtil";
import { AuthContext } from "../../../context/authProvider";
import useAuth from "../../../common/hooks/useAuth";

import CloseIcon from "@mui/icons-material/Close";

const SettingsBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    border: "1px solid #DCDCDC",
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    maxWidth: "117px",
    maxHeight: "117px",
    fontSize: "3rem",
    flexShrink: 1,
  },
  [theme.breakpoints.up("xs")]: {
    width: "160px",
    height: "160px",
    fontSize: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "195px",
    height: "195px",
    fontSize: "3rem",
  },
  [theme.breakpoints.up("lg")]: {
    width: "251px",
    height: "251px",
    fontSize: "3rem",
    margin: "0 15px 5px 15px",
  },
}));

const ProfileSettings = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isXl = useMediaQuery((theme) => theme.breakpoints.only("xl"));
  const userContext = useContext(AuthContext);
  const { updateUserInfo, changePassword } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [personalInfoError, setPersonalInfoError] = useState("");
  const [personalInfoErrorType, setPersonalInfoErrorType] = useState("info");
  const [personalInfoErrorOpen, setPersonalInfoErrorOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorType, setPasswordErrorType] = useState("info");
  const [passwordErrorOpen, setPasswordErrorOpen] = useState(false);

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();

    try {
      if (name === "" || surname === "" || email === "" || phone === "") {
        throw "All field are required";
      }
      await updateUserInfo(
        userContext.user.id,
        name,
        surname,
        email,
        phone
      ).then((res) => {
        setPersonalInfoError(res.data.message);
        setPersonalInfoErrorType("success");
        setPersonalInfoErrorOpen(true);
        console.log(res);
      });
    } catch (err) {
      setPersonalInfoError(err);
      setPersonalInfoErrorType("error");
      setPersonalInfoErrorOpen(true);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      await changePassword(
        email,
        currentPassword,
        newPassword,
        confirmPassword
      ).then((res) => {
        setPasswordError(res.data.message);
        setPasswordErrorType("success");
        setPasswordErrorOpen(true);
        console.log(res.data);
      });
    } catch (err) {
      setPasswordError(err);
      setPasswordErrorType("error");
      setPasswordErrorOpen(true);
    }
  };

  useEffect(() => {
    if (Object.keys(userContext.user).length !== 0) {
      setName(userContext.user.name);
      setSurname(userContext.user.surname);
      setEmail(userContext.user.email);
      setPhone(userContext.user.phoneNumber);
    }
  }, [userContext.user]);

  if (isXl) {
    return (
      <>
        <Grid item display={"flex"} flexDirection={isXs ? "column" : "row"}>
          <SettingsBox
            borderRadius={"10px"}
            p={3}
            mt={2}
            position={"unset"}
            sx={{ height: "fit-content" }}
          >
            <Grid
              item
              display={"flex"}
              flexDirection={isXs ? "row" : "column"}
              alignItems={"center"}
              sm={6}
              xl={12}
              py={2}
            >
              <Grid
                item
                xs={6}
                xl={12}
                display={"flex"}
                alignItems={"center"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <UserAvatar
                  {...stringAvatar(
                    `${userContext.user.name} ${userContext.user.surname}`
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={12} display={"flex"} alignItems={"center"}>
                <Button
                  sx={{
                    width: "150px",
                    height: "50px",
                    margin: "10px",
                    marginBottom: isXs ? "10px" : 0,
                  }}
                  variant="contained"
                  color="secondary"
                  size="normal"
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </SettingsBox>
          <Grid item pl={isXs ? 0 : 2} xl={12}>
            <SettingsBox borderRadius={"10px"} px={4} py={2.5} mt={2}>
              <Grid item pt={1}>
                <Typography variant="subtitle1" p>
                  Edit your personal info
                </Typography>
              </Grid>
              <Collapse in={personalInfoErrorOpen}>
                <Alert
                  severity={personalInfoErrorType}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setPersonalInfoErrorOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {personalInfoError}
                </Alert>
              </Collapse>
              <Box component="form" onSubmit={handlePersonalInfoSubmit}>
                <Grid item xs={12} sm={12} xl={12} display={"flex"} gap={2}>
                  <TextField
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="text"
                    value={name}
                    focused={true}
                    fullWidth
                  />
                  <TextField
                    label="Surname"
                    onChange={(e) => setSurname(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="text"
                    value={surname}
                    focused={true}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  display={"flex"}
                  flexDirection={"column"}
                  mt={2}
                  gap={2}
                >
                  <TextField
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="email"
                    value={email}
                    focused={true}
                    fullWidth
                  />
                  <TextField
                    label="Phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="text"
                    value={phone}
                    focused={true}
                    fullWidth
                  />
                  <Button
                    sx={{ height: "50px", alignSelf: "end" }}
                    variant="contained"
                    color="secondary"
                    size="normal"
                    fullWidth={isXs ? true : false}
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Box>
              <Grid item pt={1}>
                <Typography variant="subtitle1" p>
                  Change your password
                </Typography>
              </Grid>
              <Collapse in={passwordErrorOpen}>
                <Alert
                  severity={passwordErrorType}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setPasswordErrorOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {passwordError}
                </Alert>
              </Collapse>
              <Box component="form" onSubmit={handleChangePasswordSubmit}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  display={"flex"}
                  flexDirection="column"
                  gap={2}
                >
                  <TextField
                    label="Current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="password"
                    value={currentPassword}
                    fullWidth
                  />
                  <TextField
                    label="New password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="password"
                    value={newPassword}
                    fullWidth
                  />
                  <TextField
                    label="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    color="secondary"
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="password"
                    value={confirmPassword}
                    fullWidth
                  />
                </Grid>
                <Grid item display={"flex"} flexDirection={"column"}>
                  <Button
                    sx={{ height: "50px", alignSelf: "end", marginTop: "16px" }}
                    variant="contained"
                    color="secondary"
                    size="normal"
                    type="submit"
                    fullWidth={isXs ? true : false}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Box>
            </SettingsBox>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <SettingsBox
        borderRadius={"10px"}
        p={3}
        mt={2}
        position={"unset"}
        sx={{ height: "fit-content" }}
      >
        <Grid
          item
          display={"flex"}
          flexDirection={isXs ? "column" : "row"}
          justifyContent={"space-between"}
        >
          <Grid
            item
            display={"flex"}
            flexDirection={isXs ? "row" : "column"}
            alignItems={"center"}
            sm={4}
            pt={2}
          >
            <Grid
              item
              xs={6}
              display={"flex"}
              alignItems={"center"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <UserAvatar {...stringAvatar("Jane Doe")} />
            </Grid>
            <Grid
              item
              xs={6}
              sm={12}
              display={"flex"}
              // alignItems={isXs ? "center" : "end"}
              alignItems={"center"}
            >
              <Button
                sx={{
                  width: "150px",
                  height: "50px",
                  margin: "10px",
                  marginBottom: isXs ? "10px" : 0,
                }}
                variant="contained"
                color="secondary"
                size="normal"
              >
                Upload
              </Button>
            </Grid>
          </Grid>
          <Grid item pl={isXs ? 0 : 2} mt={isXs ? 4 : 0}>
            <Grid item py={1}>
              <Typography variant="subtitle1" p>
                Edit your personal info
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              display={"flex"}
              flexDirection={isXs ? "column" : "row"}
              gap={2}
            >
              <TextField
                label="Name"
                onChange={(e) => setName(e.target.value)}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{ disableUnderline: true }}
                type="text"
                value={name}
                fullWidth
              />
              <TextField
                label="Surname"
                onChange={(e) => setSurname(e.target.value)}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{ disableUnderline: true }}
                type="text"
                value={surname}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              display={"flex"}
              flexDirection={"column"}
              mt={2}
              gap={2}
            >
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{ disableUnderline: true }}
                type="email"
                value={email}
                fullWidth
              />
              <TextField
                label="Phone number"
                // onChange={handleSearchConditionChange}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{ disableUnderline: true }}
                type="text"
                // value={searchCondition}
                fullWidth
              />
              <Button
                sx={{ height: "50px", alignSelf: "end" }}
                variant="contained"
                color="secondary"
                size="normal"
                fullWidth={isXs ? true : false}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={isXs ? 4 : 4}>
          <Grid item py={1}>
            <Typography variant="subtitle1" p>
              Change your password
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            display={"flex"}
            flexDirection={isXs ? "column" : "row"}
            gap={2}
          >
            <TextField
              label="New password"
              // onChange={handleSearchConditionChange}
              color="secondary"
              variant="filled"
              size={isXs ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              // value={searchCondition}
              fullWidth
            />
            <TextField
              label="Confirm new password"
              // onChange={handleSearchConditionChange}
              color="secondary"
              variant="filled"
              size={isXs ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              // value={searchCondition}
              fullWidth
            />
          </Grid>
          <Grid item display={"flex"} flexDirection={"column"}>
            <Button
              sx={{
                height: "50px",
                alignSelf: "end",
                marginTop: "16px",
              }}
              variant="contained"
              color="secondary"
              size="normal"
              fullWidth={isXs ? true : false}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </SettingsBox>
    </>
  );
};

ProfileSettings.propTypes = {
  user: PropTypes.object,
};

export default ProfileSettings;
