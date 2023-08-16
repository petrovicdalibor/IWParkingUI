import { Grid, Typography } from "@mui/material";

const Users = () => {
  return (
    <Grid item display="flex" flexDirection="row" gap={3}>
      <Grid item>
        <Typography variant="h2">Users</Typography>
      </Grid>
    </Grid>
  );
};

export default Users;
