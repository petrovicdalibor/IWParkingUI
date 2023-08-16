import PropTypes from "prop-types";

import styled from "@emotion/styled";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useVehicles from "../../../common/hooks/useVehicles";

const VCard = styled(Card)(({ theme, isprimary = false }) => ({
  display: "flex",
  cursor: "pointer",
  width: "fit-content",
  borderRadius: "10px",
  color: isprimary === "true" ? "#2563EB" : "#2B2D2F",
  border:
    isprimary === "true"
      ? "1px solid rgba(37, 99, 235, 0.35)"
      : "1px solid #ECECEC",
  boxShadow:
    isprimary === "true"
      ? "0px 0px 15px 0px rgba(37, 99, 235, 0.25)"
      : "0px 0px 15px 0px rgba(157, 157, 157, 0.25)",
  ":hover": {
    border: isprimary === "true" ? "" : "1px solid #C5C5C5",
  },
  transition: theme.transitions.create("border", {
    duration: theme.transitions.duration.shorter,
  }),
}));

const VehicleCard = ({ vehicle, isprimary }) => {
  const { deleteVehicle, makePrimaryVehicle } = useVehicles();

  const handleVehicleDelete = () => {
    deleteVehicle(vehicle.id);
  };

  const handleVehiclePrimary = () => {
    if (!vehicle.isPrimary) {
      makePrimaryVehicle(vehicle.userId, vehicle.id);
    }
  };

  return (
    <VCard variant="outlined" isprimary={isprimary}>
      <CardContent
        onClick={handleVehiclePrimary}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px 0px 15px 25px",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          {vehicle.plateNumber}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 400,
          }}
        >
          {vehicle.type}
        </Typography>
      </CardContent>
      <Box p={0.4} zIndex={999}>
        <IconButton
          sx={{ position: "relative", p: "8px" }}
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleVehicleDelete}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </VCard>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.object,
  isprimary: PropTypes.any,
};

export default VehicleCard;
