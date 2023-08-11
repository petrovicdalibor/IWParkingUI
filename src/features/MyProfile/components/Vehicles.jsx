import {
  Alert,
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import VehicleCard from "./VehicleCard";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authProvider";
import useVehicles from "../../../common/hooks/useVehicles";

import CloseIcon from "@mui/icons-material/Close";

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
  const userContext = useContext(AuthContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const { addVehicle } = useVehicles();

  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");

  const [vehicleError, setVehicleError] = useState("");
  const [vehicleErrorType, setVehicleErrorType] = useState("info");

  const handleVehicleAddSubmit = (e) => {
    e.preventDefault();
    if (plate === "" || type === "") {
      setVehicleError("All fields are required");
      setVehicleErrorType("error");
    }
    addVehicle(userContext.user.id, plate, type)
      .then((res) => {
        setVehicleError(res);
        setVehicleErrorType("success");
      })
      .catch((res) => {
        setVehicleError(res);
        setVehicleErrorType("error");
      });
  };

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
          <Grid item display="flex" flexWrap="wrap" mt={0.5} gap={1.5}>
            {userContext.vehicles.length > 0 ? (
              userContext.vehicles?.map((vehicle) => (
                <VehicleCard
                  vehicle={vehicle}
                  key={vehicle.id}
                  isprimary={vehicle.isPrimary.toString()}
                />
              ))
            ) : (
              <Alert severity="warning">Please add a vehicle</Alert>
            )}
          </Grid>
          <Typography variant="subtitle1" p py={2}>
            Add a vehicle registration plate
          </Typography>
          <Collapse in={vehicleError ? true : false}>
            <Alert
              severity={vehicleErrorType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setVehicleError("");
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {vehicleError}
            </Alert>
          </Collapse>
          <Box component="form" gap onSubmit={handleVehicleAddSubmit}>
            <Grid container direction={isXs ? "column" : "row"} gap={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Registration Plate"
                  onChange={(e) => setPlate(e.target.value)}
                  color="secondary"
                  variant="filled"
                  size={isXs ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  value={plate}
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
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Car">Car</MenuItem>
                      <MenuItem value="Adapted Car">Adapted Car</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ height: "56px" }}
                    variant="contained"
                    color="secondary"
                    size="normal"
                    type="submit"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </VehiclesBox>
      </VehiclesGridItem>
    </Grid>
  );
};

export default Vehicles;
