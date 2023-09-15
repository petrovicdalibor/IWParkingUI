import {
  Button,
  CircularProgress,
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
import { FilterContext } from "../context/filterContext";

const Home = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const userContext = useContext(AuthContext);
  const parkingContext = useContext(ParkingContext);
  const filterContext = useContext(FilterContext);

  const { fetchParkingLots, deactivateParkingLot } = useParkingLots();
  const [ConfirmDialogModal, open] = useConfirm(ConfirmDialog);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const [parkings, setParkings] = useState(parkingContext.parkingLots);

  useEffect(() => {
    fetchParkingLots({
      page: 0,
      city: filterContext.searchCity,
      name: filterContext.searchCondition,
      zone: filterContext.searchZone,
      status: selectedStatus,
    });
  }, [userContext.role]);

  useEffect(() => {
    setParkings(parkingContext.parkingLots);
  }, [parkingContext.parkingLots]);

  const handleStatusChange = async (e) => {
    setSelectedStatus(e.target.value);
    setPage(1);
    if (e.target.value === "" || userContext.role === "User") {
      await fetchParkingLots({ page: 1 }).catch((err) => {
        toastError(err, { toastId: "fetch-parking-lots-error" });
      });
      return;
    }

    await fetchParkingLots({ page: 1, status: e.target.value });
  };

  const handleDeactivateParking = async (parking) => {
    const confirmDialog = await open(
      `Are you sure you want to deactivate ${parking.name}?`
    );

    if (confirmDialog) {
      const parkingLot = parkingContext.parkingLots.find((p) => {
        return p.id === parking.id;
      });
      parkingLot.isDeactivated = true;

      await deactivateParkingLot(parking.id)
        .then((res) => {
          const toastId = "deactivate-parking";

          toastSuccess(res, { toastId });
        })
        .catch((err) => {
          const toastId = "deactivate-parking";

          toastError(err, { toastId });
        });

      fetchParkingLots(page, 5, selectedStatus);
    }
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    fetchParkingLots({
      page: value,
      city: filterContext.searchCity,
      name: filterContext.searchCondition,
      zone: filterContext.searchZone,
      status: selectedStatus,
    });
  };

  let content =
    userContext.role === "User"
      ? parkingContext.parkingLots.map((parking) => (
          <ParkingLotsCard
            handleDeactivateParking={handleDeactivateParking}
            parking={parking}
            key={parking.id}
          />
        ))
      : parkings.map((parking) => (
          <ParkingLotsCard
            handleDeactivateParking={handleDeactivateParking}
            parking={parking}
            key={parking.id}
          />
        ));

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

      {userContext.role === "SuperAdmin" || userContext.role === "Owner" ? (
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

      <Grid
        container
        justifyContent={parkingContext.isLoading && "center"}
        alignItems={parkingContext.isLoading && "center"}
        height={parkingContext.isLoading && "60vh"}
      >
        {parkingContext.isLoading ? (
          <Grid
            item
            alignContent={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <CircularProgress />
          </Grid>
        ) : parkingContext.parkingLots.length === 0 ? (
          <Typography variant="body1" mt={3}>
            No parking lots found.
          </Typography>
        ) : (
          content
        )}

        {parkingContext.parkingLots.length !== 0 && (
          <Grid item width="100%" display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={parkingContext.numPages}
              color="primary"
              defaultPage={page}
              page={parkingContext.pageNumber}
              disabled={parkingContext.numPages === 1}
              onChange={handlePageChange}
            />
          </Grid>
        )}
      </Grid>
      <ConfirmDialogModal />
    </>
  );
};

export default Home;
