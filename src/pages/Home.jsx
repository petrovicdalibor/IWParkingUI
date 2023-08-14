import { Grid, Typography } from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { useContext, useEffect } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import { ParkingContext } from "../context/parkingProvider";

const Home = () => {
  const parkingContext = useContext(ParkingContext);
  const { fetchParkingLots } = useParkingLots();

  useEffect(() => {
    fetchParkingLots();
  }, []);

  return (
    <>
      <Typography variant="h2">Parking Lots</Typography>

      <Grid container>
        {parkingContext.parkingLots.map((parking) => (
          <ParkingLotsCard parking={parking} key={parking.id} />
        ))}
      </Grid>
    </>
  );
};

export default Home;
