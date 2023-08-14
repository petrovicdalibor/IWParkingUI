import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Hidden,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

import {
  BsGeoAltFill,
  BsClock,
  BsPlusCircleFill,
  BsStar,
} from "react-icons/bs";
import useParkingLots from "../../../common/hooks/useParkingLots";
import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";

const FreeSpots = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: "#059669",
  fontWeight: 500,
  [theme.breakpoints.only("xs")]: {
    fontSize: "1.4rem",
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

const ParkingLotsCard = ({ parking }) => {
  const userContext = useContext(AuthContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { addToFavorites } = useParkingLots();

  const handleAddToFavorites = () => {
    addToFavorites(userContext.user.id, parking.id);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: "10px !important",
          border: isXs ? "none" : "1px solid #DCDCDC",
          boxShadow: "none",
          marginTop: 2,
        }}
      >
        <Grid
          container
          sx={{ display: "flex" }}
          p={isXs ? 2 : 4}
          width="100%"
          justifyContent="space-between"
        >
          <Grid item display="flex" gap={5} alignItems={"center"}>
            <Grid
              item
              display={"flex"}
              flexDirection={"column"}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <FreeSpots variant="h5">
                {parking.capacityCar - parking.reservations.length}
              </FreeSpots>
              <Typography
                variant="subtitle2"
                minWidth={"69px"}
                sx={{ color: "#424343" }}
              >
                out of {parking.capacityCar}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                item
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                columnGap={2}
              >
                <ParkingName variant="h6" fontSize="1.25rem">
                  {parking.name}
                </ParkingName>
                <Typography
                  variant="subtitle2"
                  fontSize="1rem"
                  sx={{ background: "#E6E6E6", borderRadius: "5px" }}
                  px={1.5}
                >
                  {parking.price}&euro;/hr
                </Typography>
              </Grid>
              <Hidden smDown>
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
                    {parking.address} {bull} {parking.zone} {bull} Car
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
                    {parking.workingHourFrom.slice(0, -3)} -{" "}
                    {parking.workingHourTo.slice(0, -3)}
                  </ParkingInfo>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Hidden smUp>
            <Grid
              item
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              mt={2}
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
                {parking.address} {bull} {parking.zone} {bull} Car
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
                06:00 - 00:00
              </ParkingInfo>
            </Grid>
          </Hidden>
          <Grid
            item
            width={mdDown ? "100%" : "auto"}
            display="flex"
            flexDirection={isXs ? "column" : "row"}
            gap={isXs ? 1 : 2}
            alignItems="center"
            justifyItems={"center"}
            mt={mdDown ? 3 : 0}
          >
            <Grid item width={mdDown ? "100%" : "auto"}>
              <Button
                variant="contained"
                color="success"
                size="large"
                disableElevation
                fullWidth
              >
                <BsPlusCircleFill size={17} style={{ marginRight: "6px" }} />
                Reserve
              </Button>
            </Grid>
            <Grid item width={mdDown ? "100%" : "auto"}>
              <Button
                variant="outlined"
                color="favorites"
                size="large"
                onClick={handleAddToFavorites}
                fullWidth
              >
                <BsStar size={17} style={{ marginRight: "6px" }} />
                Add to Favorites
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Hidden smUp>
        <Divider
          sx={{
            width: "100%",
            marginTop: 2,
            borderColor: "rgba(57, 57, 57, 0.4)",
          }}
        />
      </Hidden>
    </>
  );
};

ParkingLotsCard.propTypes = {
  parking: PropTypes.object,
};

export default ParkingLotsCard;
