import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";

const Favorites = () => {
  const userContext = useContext(AuthContext);
  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Favorites</Typography>
        </Grid>
      </Grid>

      <Grid container>
        {userContext.favorites?.map((parking) => {
          let isFavorite = userContext.favorites.some(
            (fav) => fav.id === parking.id
          );

          return (
            <ParkingLotsCard
              isfavorite={isFavorite}
              parking={parking}
              key={parking.id}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Favorites;
