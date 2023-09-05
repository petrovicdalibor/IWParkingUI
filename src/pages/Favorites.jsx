import { Grid, Pagination, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import useParkingLots from "../common/hooks/useParkingLots";

const Favorites = () => {
  const userContext = useContext(AuthContext);
  const { fetchFavoriteLots } = useParkingLots();

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(userContext.favoritePage);
  }, [userContext.favoritePage]);

  const handlePageChange = (e, value) => {
    setPage(value);
    fetchFavoriteLots({ page: value });
  };

  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Favorites</Typography>
        </Grid>
      </Grid>

      <Grid container>
        {userContext.favorites.length > 0 ? (
          <>
            {userContext.favorites?.map((parking) => (
              <ParkingLotsCard parking={parking} key={parking.id} />
            ))}

            <Grid
              item
              width="100%"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              <Pagination
                count={userContext.favoritePages}
                color="primary"
                defaultPage={page}
                page={page}
                disabled={userContext.favoritePages === 1}
                onChange={handlePageChange}
              />
            </Grid>
          </>
        ) : (
          <Typography variant="body1" mt={3}>
            No favorite parking lots found.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Favorites;
