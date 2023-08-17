import { Button, Grid, Typography } from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { useContext, useEffect } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import { ParkingContext } from "../context/parkingProvider";
import { AuthContext } from "../context/authProvider";

const Home = () => {
  const userContext = useContext(AuthContext);
  const parkingContext = useContext(ParkingContext);
  const { fetchParkingLots, deactivateParkingLot } = useParkingLots();

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const handleDeactivateParking = async (parking) => {
    const parkingLotIndex = parkingContext.parkingLots.indexOf(parking);
    const array = [...parkingContext.parkingLots];

    array[parkingLotIndex] = {
      ...array[parkingLotIndex],
      isDeactivated: true,
    };
    parkingContext.setParkingLots(array);

    await deactivateParkingLot(parking.id);

    fetchParkingLots();
  };

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
              handleDeactivateParking={handleDeactivateParking}
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
