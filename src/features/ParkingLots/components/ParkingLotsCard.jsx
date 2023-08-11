import {
  Box,
  Button,
  Card,
  Grid,
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

const FreeSpots = styled(Typography)(() => ({
  fontSize: "2rem",
  color: "#059669",
  fontWeight: 500,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "8px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ParkingLotsCard = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "10px !important",
        border: "1px solid #DCDCDC",
        boxShadow: "none",
      }}
    >
      <Grid
        container
        sx={{ display: "flex" }}
        p={4}
        width="100%"
        justifyContent="space-between"
      >
        <Grid item display="flex" gap={5}>
          <Grid
            item
            display={"flex"}
            flexDirection={"column"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <FreeSpots variant="h5">29</FreeSpots>
            <Typography variant="subtitle2" sx={{ color: "#424343" }}>
              out of 150
            </Typography>
          </Grid>
          <Grid item>
            <Grid item display="flex" alignItems="center" gap={2}>
              <Typography variant="h6" fontSize="1.25rem">
                Parking Lot 1
              </Typography>
              <Typography
                variant="subtitle2"
                fontSize="1rem"
                sx={{ background: "#E6E6E6", borderRadius: "5px" }}
                px={1.5}
              >
                1&euro;/hr
              </Typography>
            </Grid>
            <Grid
              item
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
            >
              <Typography
                variant="body2"
                display={"flex"}
                alignItems={"center"}
                fontSize={"1rem"}
                fontWeight={400}
              >
                <BsGeoAltFill
                  size={17}
                  style={{ marginRight: "6px" }}
                  color="#CF0018"
                />
                Dame Gruev 12 {bull} Zone 1 {bull} Car
              </Typography>
              <Typography
                variant="body2"
                display={"flex"}
                alignItems={"center"}
                fontSize={"1rem"}
                fontWeight={400}
              >
                <BsClock
                  size={17}
                  style={{ marginRight: "6px" }}
                  color="#CF0018"
                />
                06:00 - 00:00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          width={isXs ? "100%" : "auto"}
          display="flex"
          flexDirection={isXs ? "column" : "row"}
          gap={isXs ? 1 : 2}
          alignItems="center"
          justifyItems={"center"}
        >
          <Grid item width={isXs ? "100%" : "auto"}>
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
          <Grid item width={isXs ? "100%" : "auto"}>
            <Button variant="outlined" color="favorites" size="large" fullWidth>
              <BsStar size={17} style={{ marginRight: "6px" }} />
              Add to Favorites
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ParkingLotsCard;
