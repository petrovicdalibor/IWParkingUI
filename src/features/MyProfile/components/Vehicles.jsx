import {
  Box,
  Button,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import VehicleCard from "./VehicleCard";

const VehiclesGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.only("xl")]: {
    width: "729px",
  },
}));

const VehiclesBox = styled(Box)(({ theme }) => ({
  border: 0,
  height: "fit-content",
  [theme.breakpoints.up("sm")]: {
    border: "1px solid #DCDCDC",
  },
}));

const Vehicles = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <Grid
      item
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"end"}
      mt={isXs ? 0 : 2}
    >
      <VehiclesGridItem item justifySelf={"end"}>
        <VehiclesBox borderRadius={"10px"} py={3} px={4}>
          <Hidden smDown>
            <Typography variant="h5" p fontWeight={500}>
              Vehicles
            </Typography>
          </Hidden>
          <Typography variant="subtitle1" p>
            Select your default vehicle registration plate
          </Typography>
          <Grid item display={"flex"} flexWrap={"wrap"} gap={1.5}>
            <VehicleCard plate="SK 1234 BB" type="Car" />
            <VehicleCard
              plate="SK 4321 BB"
              type="Adapted Car"
              isselected="true"
            />
            <VehicleCard plate="SK 5678 BB" type="Car" />
          </Grid>
          <Typography variant="subtitle1" p py={2}>
            Add a vehicle registration plate
          </Typography>
          <Grid container direction={isXs ? "column" : "row"} gap={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Registration Plate"
                // onChange={handleSearchConditionChange}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{ disableUnderline: true }}
                type="text"
                // value={searchCondition}
                fullWidth
              />
            </Grid>
            <Grid item display="flex" gap={1.5}>
              <Grid item xs={"auto"}>
                <FormControl variant="filled" sx={{ minWidth: "100px" }}>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    color="secondary"
                  >
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    disableUnderline={true}
                    value={""}
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Car</MenuItem>
                    <MenuItem value={1}>Adapted Car</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  sx={{ height: "56px" }}
                  variant="contained"
                  color="secondary"
                  size="normal"
                  // fullWidth={isXs ? true : false}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </VehiclesBox>
      </VehiclesGridItem>
    </Grid>
  );
};

export default Vehicles;
