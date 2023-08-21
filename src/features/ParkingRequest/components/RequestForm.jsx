import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Hidden,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { BsPSquare } from "react-icons/bs";
import { useState } from "react";
import PropTypes from "prop-types";
import useParkingLots from "../../../common/hooks/useParkingLots";
import Cookies from "universal-cookie";

const RequestBox = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    border: "1px solid #DCDCDC",
  },
}));

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Belgrade");

const RequestForm = ({ isEdit }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { addParkingLot } = useParkingLots();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  const [capacityCar, setCapacityCar] = useState("");
  const [capacityAdaptedCar, setCapacityAdaptedCar] = useState("");

  const [workFrom, setWorkFrom] = useState(
    dayjs.utc("2023-01-01T23:00").tz("Europe/Belgrade")
  );
  const [workTo, setWorkTo] = useState(
    dayjs.utc("2023-01-01T23:00").tz("Europe/Belgrade")
  );

  const handleParkingEdit = () => {};

  const handleParkingAdd = async (e) => {
    e.preventDefault();
    const workFromParse = workFrom
      .tz("Europe/Belgrade")
      .toDate()
      .toString()
      .split(" ")[4];
    const workToParse = workTo
      .tz("Europe/Belgrade")
      .toDate()
      .toString()
      .split(" ")[4];

    await addParkingLot(
      name,
      price,
      zone,
      address,
      workFromParse,
      workToParse,
      capacityCar,
      capacityAdaptedCar,
      price,
      decodedToken.Id
    );
  };

  return (
    <RequestBox container p={3} mt={2} direction="row">
      <Hidden mdDown>
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BsPSquare size={110} color="#757575" style={{ margin: "12px" }} />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Box
          component="form"
          onSubmit={isEdit ? handleParkingEdit : handleParkingAdd}
        >
          <Grid
            item
            xs={12}
            display={"flex"}
            flexDirection={isXs ? "column" : "row"}
            gap={2}
          >
            <TextField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              color="secondary"
              variant="filled"
              size={isXs ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              value={name}
              fullWidth
            />
            <Grid item xs={12} md={4} display={"flex"} gap={2}>
              <TextField
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
                color="secondary"
                variant="filled"
                size={isXs ? "small" : "normal"}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">eur/hr</InputAdornment>
                  ),
                }}
                type="text"
                value={price}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            flexDirection={isXs ? "column" : "row"}
            gap={2}
            mt={2}
          >
            <TextField
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              color="secondary"
              variant="filled"
              size={isXs ? "small" : "normal"}
              InputProps={{ disableUnderline: true }}
              type="text"
              value={address}
              fullWidth
            />
            <Grid item xs={12} md={5} display={"flex"} gap={2}>
              <FormControl variant="filled" sx={{ minWidth: "100%" }}>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  color="secondary"
                >
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  disableUnderline={true}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Car">Car</MenuItem>
                  <MenuItem value="Adapted Car">Adapted Car</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5} display={"flex"} gap={2}>
              <FormControl variant="filled" sx={{ minWidth: "100%" }}>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  color="secondary"
                >
                  Zone
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  disableUnderline={true}
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Car">Car</MenuItem>
                  <MenuItem value="Adapted Car">Adapted Car</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection={mdDown ? "column" : "row"}
            mt={2}
            gap={2}
          >
            <Grid
              item
              display="flex"
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              flexDirection="row"
              gap={2}
            >
              <Grid
                item
                display="flex"
                sm={2}
                md={6}
                flexDirection="row"
                gap={2}
              >
                <LocalizationProvider
                  // dateLibInstance={dayjs.tz}
                  dateAdapter={AdapterDayjs}
                >
                  <DemoContainer
                    components={["TimeField"]}
                    sx={{
                      boxShadow:
                        "0px 0px 15px 0px rgba(157, 157, 157, 0.25) !important",
                      p: 0,
                    }}
                  >
                    <TimeField
                      timezone="Europe/Belgrade"
                      label="From"
                      variant="filled"
                      color="secondary"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      value={workFrom}
                      onChange={(newValue) => setWorkFrom(newValue)}
                      format="HH:mm"
                      sx={{ minWidth: "0 !important" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              -
              <Grid
                item
                display="flex"
                sm={2}
                md={6}
                flexDirection="row"
                gap={2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["TimeField"]}
                    sx={{
                      boxShadow:
                        "0px 0px 15px 0px rgba(157, 157, 157, 0.25) !important",
                      p: 0,
                    }}
                  >
                    <TimeField
                      timezone="Europe/Belgrade"
                      label="To"
                      variant="filled"
                      color="secondary"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      value={workTo}
                      onChange={(newValue) => setWorkTo(newValue)}
                      format="HH:mm"
                      sx={{
                        minWidth: "0 !important",
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              item
              display="flex"
              xs={12}
              sm={7}
              alignItems="center"
              flexDirection="row"
              gap={2}
            >
              <Grid item xs={12} sm={6} display="flex" gap={2}>
                <TextField
                  label="Car Capacity"
                  onChange={(e) => setCapacityCar(e.target.value)}
                  color="secondary"
                  variant="filled"
                  size={isXs ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  value={capacityCar}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" gap={2}>
                <TextField
                  label="Adapted Car Capacity"
                  onChange={(e) => setCapacityAdaptedCar(e.target.value)}
                  color="secondary"
                  variant="filled"
                  size={isXs ? "small" : "normal"}
                  InputProps={{ disableUnderline: true }}
                  type="text"
                  value={capacityAdaptedCar}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            display="flex"
            flexDirection="column"
            mt={2}
            gap={2}
          >
            <Button
              sx={{ height: "50px", alignSelf: "end" }}
              variant="contained"
              color="secondary"
              size="normal"
              fullWidth={isXs ? true : false}
              type="submit"
            >
              Save Changes
            </Button>
          </Grid>
        </Box>
      </Grid>
    </RequestBox>
  );
};

RequestForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default RequestForm;
