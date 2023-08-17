import { Button, Grid, Typography } from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { useContext, useEffect } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import { ParkingContext } from "../context/parkingProvider";
import { AuthContext } from "../context/authProvider";

const Home = () => {
  const userContext = useContext(AuthContext);
  const parkingContext = useContext(ParkingContext);
  const { fetchParkingLots } = useParkingLots();

  useEffect(() => {
    fetchParkingLots();
  }, []);

  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Parking Lots</Typography>
        </Grid>
        {userContext.role === "Owner" ? (
          <Grid item>
            <Button variant="contained" color="secondary" disableElevation>
              Add Parking Lot
            </Button>
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <Grid container>
        {parkingContext.parkingLots.map((parking) => {
          const isFavorite = userContext.favorites.some(
            (fav) => fav.id === parking.id
          );

          return (
            <ParkingLotsCard
              isFavorite={isFavorite}
              parking={parking}
              key={parking.id}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
