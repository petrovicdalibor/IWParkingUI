import { Grid, Typography } from "@mui/material";

const UserCard = () => {
  return (
    <Grid item display="flex" flexDirection="row" gap={3}>
      <Grid item>
        <Typography variant="h2">Parking Lots</Typography>
      </Grid>
    </Grid>
  );
};

export default UserCard;
