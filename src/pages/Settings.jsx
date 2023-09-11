import { Grid, Typography } from "@mui/material";

const Settings = () => {
  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Site Settings</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
