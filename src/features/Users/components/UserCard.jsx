import PropTypes from "prop-types";
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { BsStopCircle } from "react-icons/bs";

const UserCard = ({ user, handleDeactivateUser }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const deactivateUserHandler = () => {
    handleDeactivateUser(user);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: "10px !important",
          border: isXs ? "none" : "1px solid #DCDCDC",
          boxShadow: "none",
          marginTop: 2,
        }}
      >
        <Grid
          item
          p={3}
          display="flex"
          flexDirection={isXs ? "column" : "row"}
          justifyContent="space-between"
        >
          <Grid item display="flex" flexDirection="column" gap={1}>
            <Grid item display="flex" flexDirection="row" gap={4}>
              <Grid item>
                <Typography variant="h6">
                  {console.log(user)}
                  {user.name + " " + user.surname}
                </Typography>
              </Grid>
              <Grid item alignSelf="center">
                <Badge badgeContent={"User"} color="success" />
              </Grid>
            </Grid>
            <Grid item display="flex" flexDirection="row" gap={4}>
              <Grid item>
                <Typography variant="body2">{user.userName}</Typography>
                <Typography variant="body2">{user.phoneNumber}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            alignSelf="center"
            width={isXs ? "100%" : "auto"}
            mt={isXs ? 2 : 0}
          >
            {user.isDeactivated ? (
              <Button
                variant="contained"
                size="large"
                disableElevation
                disabled
                sx={{ minWidth: "164px" }}
                fullWidth
              >
                <BsStopCircle size={20} style={{ marginRight: "8px" }} />
                Deactivated
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={deactivateUserHandler}
                disableElevation
                sx={{ minWidth: "164px" }}
                fullWidth
              >
                <BsStopCircle size={20} style={{ marginRight: "8px" }} />
                Deactivate
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
      <Hidden smUp>
        <Divider
          sx={{
            width: "100%",
            marginTop: 2,
            borderColor: "rgba(57, 57, 57, 0.4)",
          }}
        />
      </Hidden>
    </>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
  handleDeactivateUser: PropTypes.func,
};

export default UserCard;
