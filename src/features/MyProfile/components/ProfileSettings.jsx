import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { stringAvatar } from "../../../common/utils/AvatarUtil";

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
}));

const ProfileSettings = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <>
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
      <Grid item mt={isXs ? 4 : 0}>
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
    </>
  );
};

export default ProfileSettings;
