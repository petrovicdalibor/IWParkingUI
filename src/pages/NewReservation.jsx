import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toastError, toastSuccess } from "../common/utils/toasts";

import { BsGeoAltFill, BsClock, BsPlusCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import useParkingLots from "../common/hooks/useParkingLots";
import useReservations from "../common/hooks/useReservations";

const BoxContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    border: "1px solid #DCDCDC",
    borderRadius: "10px",
  },
}));

const ParkingName = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 500,
  [theme.breakpoints.only("xs")]: {
    fontSize: "1.125rem",
  },
}));

const ParkingInfo = styled(Typography)(({ theme }) => ({
  fontSize: ".9rem",
  fontWeight: 400,
  [theme.breakpoints.only("xs")]: {
    fontSize: ".9",
  },
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "8px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const NewReservation = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const userContext = useContext(AuthContext);

  const { id } = useParams();
  const { fetchParkingLot } = useParkingLots();
  const { makeReservation } = useReservations();

  const [parking, setParking] = useState({});
  const [vehicle, setVehicle] = useState("");

  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());

  useEffect(() => {
    setVehicle(
      userContext.vehicles?.find((vehicle) => vehicle.isPrimary)?.plateNumber ||
        ""
    );
  }, [userContext.vehicles]);

  useEffect(() => {
    fetchParkingLot(id).then((res) => {
      setParking(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fromTimeParse = fromDate
      .tz("Europe/Belgrade")
      .toDate()
      .toString()
      .split(" ")[4];
    const toTimeParse = toDate
      .tz("Europe/Belgrade")
      .toDate()
      .toString()
      .split(" ")[4];

    const toDateString = toDate
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .toString()
      .slice(0, 10);
    const fromDateString = fromDate
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .toString()
      .slice(0, 10);

    await makeReservation(
      fromDateString,
      fromTimeParse,
      toDateString,
      toTimeParse,
      parking?.id,
      vehicle
    )
      .then((res) => {
        toastSuccess(res, { toastId: "makeReservation" });
        navigate("/reservations", { replace: true });
      })
      .catch((err) => {
        toastError(err, { toastId: "makeReservation" });
      });
  };

  return (
    <>
      <Grid item display="flex" flexDirection="column">
        <Grid item>
          <Typography variant="h2">New Reservation</Typography>
        </Grid>

        <BoxContainer container p={4} mt={2} direction="row">
          <Grid container justifyContent="space-between">
            <Grid item>
              <Grid
                item
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                columnGap={2}
              >
                <ParkingName variant="h6" fontSize="1.25rem">
                  {parking?.name}
                </ParkingName>
                <Typography
                  variant="subtitle2"
                  fontSize="1rem"
                  sx={{ background: "#E6E6E6", borderRadius: "5px" }}
                  px={1.5}
                >
                  {parking?.price}&euro;/hr
                </Typography>
              </Grid>

              <Grid
                item
                display="flex"
                flexDirection="column"
                justifyContent={"center"}
              >
                <ParkingInfo
                  variant="body2"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <BsGeoAltFill
                    size={17}
                    style={{ marginRight: "6px" }}
                    color="#CF0018"
                  />
                  {parking?.address} {bull} {parking?.city} {bull}{" "}
                  {parking?.zone}
                </ParkingInfo>
                <ParkingInfo
                  variant="body2"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <BsClock
                    size={17}
                    style={{ marginRight: "6px" }}
                    color="#CF0018"
                  />
                  {parking?.workingHourFrom?.slice(0, -3)} -{" "}
                  {parking?.workingHourTo?.slice(0, -3)}
                </ParkingInfo>
              </Grid>
            </Grid>
            <Grid
              item
              width={mdDown ? "100%" : "auto"}
              display="flex"
              flexDirection={isXs ? "column" : "row"}
              gap={isXs ? 1 : 2}
              justifyItems={"center"}
              mt={mdDown ? 3 : 0}
            >
              <Typography variant="subtitle2" sx={{ color: "#B3B3B3" }}>
                <b style={{ color: "#424343" }}>
                  {parking?.availableCapacityCar +
                    parking?.availableCapacityAdaptedCar}
                </b>{" "}
                out of {parking?.capacityCar + parking?.capacityAdaptedCar}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            mt={3}
            gap={2}
            direction="column"
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid
              item
              display={"flex"}
              gap={!isXs && 2}
              flexDirection={isXs ? "column" : "row"}
            >
              <Grid item>
                <Hidden smUp>
                  <Grid
                    item
                    display="flex"
                    justifyContent={!isXs && "center"}
                    alignItems={!isXs && "center"}
                    pb={1}
                  >
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                      from
                    </Typography>
                  </Grid>
                </Hidden>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    timezone="Europe/Belgrade"
                    reduceAnimations={true}
                    value={fromDate}
                    ampm={false}
                    disablePast
                    onChange={(val) => {
                      setFromDate(val.tz("Europe/Belgrade"));
                      if (val.tz("Europe/Belgrade") > fromDate) {
                        setToDate(val.tz("Europe/Belgrade"));
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Hidden smDown>
                <Grid
                  item
                  display="flex"
                  justifyContent={!isXs && "center"}
                  alignItems={!isXs && "center"}
                >
                  <Typography variant="body2" sx={{ color: "#757575" }}>
                    until
                  </Typography>
                </Grid>
              </Hidden>
              <Grid item>
                <Hidden smUp>
                  <Grid
                    item
                    display="flex"
                    justifyContent={!isXs && "center"}
                    alignItems={!isXs && "center"}
                    pb={1}
                  >
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                      until
                    </Typography>
                  </Grid>
                </Hidden>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    reduceAnimations={true}
                    value={toDate}
                    ampm={false}
                    disablePast
                    minDate={fromDate}
                    onChange={(val) => setToDate(val)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item>
              {userContext.vehicles.length > 0 ? (
                <FormControl variant="filled" sx={{ width: "200px" }}>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    color="secondary"
                  >
                    Vehicle
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    disableUnderline={true}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                  >
                    {userContext.vehicles.map((vehicle) => (
                      <MenuItem value={vehicle.plateNumber} key={vehicle.id}>
                        {vehicle.plateNumber} - {vehicle.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Alert severity="warning">
                  Please add a vehicle to{" "}
                  <Link component={RouterLink} color="secondary" to="/profile">
                    your profile
                  </Link>
                </Alert>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSubmit}
                disabled={userContext.vehicles.length === 0}
                disableElevation
              >
                <BsPlusCircleFill size={17} style={{ marginRight: "6px" }} />
                Add new reservation
              </Button>
            </Grid>
          </Grid>
        </BoxContainer>
      </Grid>
    </>
  );
};

export default NewReservation;
