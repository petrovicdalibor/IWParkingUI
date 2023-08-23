import { Button, Grid, Typography } from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { useContext, useEffect } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import { ParkingContext } from "../context/parkingProvider";
import { AuthContext } from "../context/authProvider";
import { Link } from "react-router-dom";
import { toastError, toastSuccess } from "../common/utils/toasts";
import useConfirm from "../common/hooks/useConfirm";
import ConfirmDialog from "../features/ConfirmDialog/components/ConfirmDialog";

const Home = () => {
  const userContext = useContext(AuthContext);
  const parkingContext = useContext(ParkingContext);
  const { fetchParkingLots, deactivateParkingLot } = useParkingLots();
  const [ConfirmDialogModal, open] = useConfirm(ConfirmDialog);

  useEffect(() => {
    fetchParkingLots();
  }, [userContext.role]);

  const handleDeactivateParking = async (parking) => {
    const confirmDialog = await open(
      `Are you sure you want to deactivate ${parking.name}?`
    );

    if (confirmDialog) {
      const parkingLotIndex = parkingContext.parkingLots.indexOf(parking);
      const array = [...parkingContext.parkingLots];

      array[parkingLotIndex] = {
        ...array[parkingLotIndex],
        isDeactivated: true,
      };
      parkingContext.setParkingLots(array);

      await deactivateParkingLot(parking.id)
        .then((res) => {
          const toastId = "deactivate-parking";

          toastSuccess(res, { toastId });
        })
        .catch((err) => {
          const toastId = "deactivate-parking";

          toastError(err, { toastId });
        });

      fetchParkingLots();
    }
  };

  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Parking Lots</Typography>
        </Grid>
        {userContext.role === "Owner" ? (
          <Grid item>
            <Link to="/add-parking">
              <Button variant="contained" color="secondary" disableElevation>
                Add Parking Lot
              </Button>
            </Link>
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
      <ConfirmDialogModal />
    </>
  );
};

export default Home;
