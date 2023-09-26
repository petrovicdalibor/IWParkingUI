import {
  Box,
  Grid,
  List,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { FilterContext } from "../context/filterContext";

import { BsPlusLg } from "react-icons/bs";
import useParkingLots from "../common/hooks/useParkingLots";
import { toastError, toastSuccess } from "../common/utils/toasts";
import SettingsListItem from "../features/Settings/components/SettingsListItem";

const Settings = () => {
  const filterContext = useContext(FilterContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const { addCity, deleteCity, addZone, deleteZone } = useParkingLots();

  const [dense] = useState(false);

  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  const handleAddCity = async (e) => {
    e.preventDefault();

    await addCity(city)
      .then((res) => {
        toastSuccess(res, { toastId: "addCitySuccess" });
        setCity("");
      })
      .catch((err) => {
        toastError(err, { toastId: "addCityError" });
      });
  };

  const handleDeleteCity = async (cityId) => {
    await deleteCity(cityId)
      .then((res) => {
        toastSuccess(res, { toastId: "addCitySuccess" });
      })
      .catch((err) => {
        toastError(err, { toastId: "addCityError" });
      });
  };

  const handleAddZone = async (e) => {
    e.preventDefault();

    await addZone(zone)
      .then((res) => {
        toastSuccess(res, { toastId: "addZoneSuccess" });
        setZone("");
      })
      .catch((err) => {
        toastError(err, { toastId: "addZoneError" });
      });
  };

  const handleDeleteZone = async (zoneId) => {
    await deleteZone(zoneId)
      .then((res) => {
        toastSuccess(res, { toastId: "addZoneSuccess" });
      })
      .catch((err) => {
        toastError(err, { toastId: "addZoneError" });
      });
  };

  return (
    <>
      <Grid item display="flex" flexDirection="row">
        <Grid item>
          <Typography variant="h2">Site Settings</Typography>
        </Grid>
      </Grid>

      <Grid container mt={2} spacing={3}>
        <Grid item xs={12} sm={6}>
          <List
            dense={dense}
            sx={{ border: "1px solid #DCDCDC", borderRadius: "10px", p: 3 }}
            subheader={
              <Typography variant="h6" sx={{ mb: 1 }}>
                Cities
              </Typography>
            }
          >
            {filterContext.cities.map((city) => (
              <SettingsListItem
                item={city}
                handleDeleteItem={handleDeleteCity}
                key={city.id}
              />
            ))}
            <Box
              sx={{ mt: 2 }}
              gap={2}
              component="form"
              onSubmit={handleAddCity}
            >
              <Grid container direction="row">
                <Grid item xs={9} display="flex" alignItems="center">
                  <TextField
                    label="New City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="text"
                    value={city}
                  />
                  <BsPlusLg
                    size={22}
                    style={{ marginLeft: "10px", flexShrink: 0 }}
                    onClick={handleAddCity}
                  />
                </Grid>
              </Grid>
            </Box>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List
            dense={dense}
            sx={{ border: "1px solid #DCDCDC", borderRadius: "10px", p: 3 }}
            subheader={
              <Typography variant="h6" sx={{ mb: 1 }}>
                Zones
              </Typography>
            }
          >
            {filterContext.zones.map((zone) => (
              <SettingsListItem
                item={zone}
                handleDeleteItem={handleDeleteZone}
                key={zone.id}
              />
            ))}
            <Box
              sx={{ mt: 2 }}
              gap={2}
              component="form"
              onSubmit={handleAddZone}
            >
              <Grid container direction={isXs ? "column" : "row"}>
                <Grid item xs={9} display="flex" alignItems="center">
                  <TextField
                    label="New Zone"
                    onChange={(e) => {
                      setZone(e.target.value);
                    }}
                    variant="filled"
                    size={isXs ? "small" : "normal"}
                    InputProps={{ disableUnderline: true }}
                    type="text"
                    value={zone}
                  />
                  <BsPlusLg
                    size={22}
                    style={{ marginLeft: "10px", flexShrink: 0 }}
                    onClick={handleAddZone}
                  />
                </Grid>
              </Grid>
            </Box>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
