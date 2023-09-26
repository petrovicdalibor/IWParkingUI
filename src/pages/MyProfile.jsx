import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import ProfileSettings from "../features/MyProfile/components/ProfileSettings";
import Vehicles from "../features/MyProfile/components/Vehicles";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authProvider";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const MyProfile = () => {
  const userContext = useContext(AuthContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const [value, setValue] = useState(0);

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
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              label="Profile"
              sx={{
                width: userContext.role === "User" ? "50%" : "100% !important",
                maxWidth: "100%",
              }}
              {...a11yProps(0)}
            />
            {userContext.role === "User" ? (
              <Tab label="Vehicles" sx={{ width: "50%" }} {...a11yProps(1)} />
            ) : (
              ""
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProfileSettings user={userContext.user} />
        </CustomTabPanel>
        {userContext.role === "User" ? (
          <CustomTabPanel value={value} index={1}>
            <Vehicles />
          </CustomTabPanel>
        ) : (
          ""
        )}
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h2">My Profile</Typography>

      <ProfileSettings user={userContext.user} />
      {userContext.role === "User" ? <Vehicles /> : ""}
    </>
  );
};

export default MyProfile;
