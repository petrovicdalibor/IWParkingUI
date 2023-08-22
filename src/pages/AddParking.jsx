import { Grid, Typography } from "@mui/material";
import RequestForm from "../features/ParkingRequest/components/RequestForm";

const AddParking = () => {
  return (
    <>
      <Grid item display="flex" flexDirection="column">
        <Grid item>
          <Typography variant="h2">Add Parking Lot</Typography>
        </Grid>

        <RequestForm />
      </Grid>
    </>
  );
};

export default AddParking;
