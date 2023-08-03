import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import ProfileSettings from "../features/MyProfile/components/ProfileSettings";
import Vehicles from "../features/MyProfile/components/Vehicles";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 0 }}>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const MyProfile = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isXs) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Profile" sx={{ width: "50%" }} {...a11yProps(0)} />
            <Tab label="Vehicles" sx={{ width: "50%" }} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProfileSettings />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Vehicles />
        </CustomTabPanel>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h2">My Profile</Typography>

      <ProfileSettings />
      <Vehicles />
    </>
  );
};

export default MyProfile;
