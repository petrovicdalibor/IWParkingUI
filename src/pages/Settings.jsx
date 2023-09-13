import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { FilterContext } from "../context/filterContext";

import DeleteIcon from "@mui/icons-material/Delete";

import { BsPlusCircleFill } from "react-icons/bs";

const Settings = () => {
  const filterContext = useContext(FilterContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const [dense, setDense] = useState(false);

  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

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
              <>
                <ListItem
                  sx={{
                    borderRadius: "10px",
                    ":hover": {
                      background: "#F1F1F1",
                    },
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  key={city.id}
                >
                  <ListItemText primary={city.name} />
                </ListItem>
                <Divider></Divider>
              </>
            ))}
            <Box sx={{ mt: 2 }} gap={2} component="form">
              <Grid container direction={isXs ? "column" : "row"} gap={2}>
                <Grid item xs={6}>
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
                    // fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" sx={{ height: "56px" }}>
                    <BsPlusCircleFill size={18} />
                  </Button>
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
              <>
                <ListItem
                  sx={{
                    borderRadius: "10px",
                    ":hover": {
                      background: "#F1F1F1",
                    },
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  key={zone.id}
                >
                  <ListItemText primary={zone.name} />
                </ListItem>
                <Divider></Divider>
              </>
            ))}
            <Box sx={{ mt: 2 }} gap={2} component="form">
              <Grid container direction={isXs ? "column" : "row"} gap={2}>
                <Grid item xs={10}>
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
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" sx={{ height: "56px" }}>
                    <BsPlusCircleFill size={18} />
                  </Button>
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
