import {
  Box,
  Button,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { BsGeoAltFill, BsClock, BsPlusCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";

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

  const userContext = useContext(AuthContext);

  const [vehicle, setVehicle] = useState("");

  useEffect(() => {
    setVehicle(
      userContext.vehicles?.find((vehicle) => vehicle.isPrimary)?.id || ""
    );
  }, [userContext.vehicles]);

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
                  Parking Lot 1
                </ParkingName>
                <Typography
                  variant="subtitle2"
                  fontSize="1rem"
                  sx={{ background: "#E6E6E6", borderRadius: "5px" }}
                  px={1.5}
                >
                  3&euro;/hr
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
                  Orce Nikolov 32 {bull} Skopje {bull} A1
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
                  10:00 - 22:00
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
                <b style={{ color: "#424343" }}>16</b> out of 150
              </Typography>
            </Grid>
          </Grid>

          <Grid container mt={3} gap={2} direction="column">
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
                  <DateTimePicker defaultValue={dayjs()} />
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
                    defaultValue={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item>
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
                    <MenuItem value={vehicle.id} key={vehicle.id}>
                      {vehicle.plateNumber} - {vehicle.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disableElevation
                // fullWidth
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
