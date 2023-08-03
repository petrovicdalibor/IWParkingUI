import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { stringAvatar } from "../../../common/utils/AvatarUtil";

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
                <UserAvatar {...stringAvatar("Jane Doe")} />
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
              <Grid item py={1}>
                <Typography variant="subtitle1" p>
                  Edit your personal info
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} xl={12} display={"flex"} gap={2}>
                <TextField
                  label="Name"
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
                  label="Surname"
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
                  // onChange={handleSearchConditionChange}
                  color="secondary"
                  variant="filled"
                  size={isXs ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="email"
                  // value={searchCondition}
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
                  sx={{ height: "50px", alignSelf: "end", marginTop: "16px" }}
                  variant="contained"
                  color="secondary"
                  size="normal"
                  fullWidth={isXs ? true : false}
                >
                  Change Password
                </Button>
              </Grid>
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
                label="Surname"
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
                // onChange={handleSearchConditionChange}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{ disableUnderline: true }}
                type="email"
                // value={searchCondition}
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

export default ProfileSettings;
