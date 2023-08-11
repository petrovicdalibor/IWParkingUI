import { Grid, Typography } from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";

const Home = () => {
  return (
    <>
      <Typography variant="h2">Parking Lots</Typography>

      <Grid container>
        <ParkingLotsCard />
      </Grid>
    </>
  );
};

export default Home;
