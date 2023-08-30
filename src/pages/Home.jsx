import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { useContext, useEffect, useState } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import { ParkingContext } from "../context/parkingProvider";
import { AuthContext } from "../context/authProvider";
import { Link } from "react-router-dom";
import { toastError, toastSuccess } from "../common/utils/toasts";
import useConfirm from "../common/hooks/useConfirm";
import ConfirmDialog from "../features/ConfirmDialog/components/ConfirmDialog";

const Home = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const userContext = useContext(AuthContext);
  const parkingContext = useContext(ParkingContext);
  const { fetchParkingLots, deactivateParkingLot } = useParkingLots();
  const [ConfirmDialogModal, open] = useConfirm(ConfirmDialog);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [parkings, setParkings] = useState(parkingContext.parkingLots);

  useEffect(() => {
    fetchParkingLots(1, 3, selectedStatus).then((res) =>
      setNumPages(res.numPages)
    );
  }, [userContext.role]);

  useEffect(() => {
    setParkings(parkingContext.parkingLots);
  }, [parkingContext.parkingLots]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setPage(1);
    if (e.target.value === "" || userContext.role === "User") {
      fetchParkingLots(1, 3, "").then((res) => {
        setNumPages(res.numPages);
        setPage(1);
      });
      return;
    }

    fetchParkingLots(1, 3, e.target.value).then((res) => {
      setNumPages(res.numPages);
      setPage(1);
    });
  };

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

  const handlePageChange = (e, value) => {
    setPage(value);
    fetchParkingLots(value, 3, selectedStatus).then((res) => console.log(res));
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
      {userContext.role === "Owner" || userContext.role === "SuperAdmin" ? (
        <Grid item mt={1} sx={{ minWidth: "150px", maxWidth: "180px" }}>
          <FormControl
            variant="filled"
            size={isXs ? "small" : "normal"}
            fullWidth
          >
            <InputLabel id="city-select-label">Status</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              variant="filled"
              size={isXs ? "small" : "normal"}
              disableUnderline={true}
              value={selectedStatus}
              onChange={handleStatusChange}
              label="City"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="2">Deactivated</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}

      <Grid container>
        {userContext.role === "User"
          ? parkingContext.parkingLots.map((parking) => {
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
            })
          : parkings.map((parking) => {
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

        {console.log(page)}
        <Grid item width="100%" display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={numPages}
            color="primary"
            defaultPage={page}
            disabled={numPages === 1}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
      <ConfirmDialogModal />
    </>
  );
};

export default Home;
