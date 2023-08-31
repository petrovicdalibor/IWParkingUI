import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import CloseIcon from "@mui/icons-material/Close";

const RequestDetails = ({
  open,
  request,
  handleClose,
  handleApprove,
  handleDecline,
}) => {
  const oldStyle = { textDecoration: "line-through", color: "#959595" };
  const newStyle = {
    backgroundColor: "#E8FEF1",
    color: "#219653",
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Request #${request.id}`}
        <Typography variant="body2" ml={0.1}>
          {request.type === "3"
            ? "Changes Preview"
            : request.type === "2"
            ? "Delete Request"
            : "New Lot Request"}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[700],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container direction="column">
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Name</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.name !== request.parkingLot.name ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.name}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.name !== request.parkingLot.name
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>City</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.city !== request.parkingLot.city ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.city}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.city !== request.parkingLot.city
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.city}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Address</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.address !== request.parkingLot.address ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.address}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.address !== request.parkingLot.address
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.address}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Zone</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.zone !== request.parkingLot.zone ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.zone}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.zone !== request.parkingLot.zone
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.zone}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Working Hours</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              (request.oldParkingLot.workingHourFrom !==
                request.parkingLot.workingHourFrom ||
                request.oldParkingLot.workingHourTo !==
                  request.parkingLot.workingHourTo) ? (
                <Typography sx={oldStyle} p>
                  {`${request.oldParkingLot.workingHourFrom.slice(
                    0,
                    -3
                  )} - ${request.oldParkingLot.workingHourTo.slice(0, -3)}`}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  (request.oldParkingLot.workingHourFrom !==
                    request.parkingLot.workingHourFrom ||
                    request.oldParkingLot.workingHourTo !==
                      request.parkingLot.workingHourTo)
                    ? newStyle
                    : {}
                }
                p
              >
                {`${request.parkingLot.workingHourFrom.slice(
                  0,
                  -3
                )} - ${request.parkingLot.workingHourTo.slice(0, -3)}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Car Capacity</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.capacityCar !==
                request.parkingLot.capacityCar ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.capacityCar}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.capacityCar !==
                    request.parkingLot.capacityCar
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.capacityCar}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Adapted Car Capacity</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.capacityAdaptedCar !==
                request.parkingLot.capacityAdaptedCar ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.capacityAdaptedCar}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.capacityAdaptedCar !==
                    request.parkingLot.capacityAdaptedCar
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.capacityAdaptedCar}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Price</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              {request.oldParkingLot &&
              request.oldParkingLot.price !== request.parkingLot.price ? (
                <Typography sx={oldStyle} p>
                  {request.oldParkingLot.price}
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={
                  request.oldParkingLot &&
                  request.oldParkingLot.price !== request.parkingLot.price
                    ? newStyle
                    : {}
                }
                p
              >
                {request.parkingLot.price}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography p>Owner</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography p>{request.user.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: "24px", pb: "16px" }}>
        <Button
          onClick={() => {
            handleApprove();
            handleClose();
          }}
          variant="contained"
          color="success"
          size="large"
          autoFocus
        >
          <BsCheckCircle size={17} style={{ marginRight: "6px" }} />
          Approve
        </Button>
        <Button
          onClick={() => {
            handleDecline();
            handleClose();
          }}
          variant="contained"
          color="primary"
          size="large"
        >
          <BsXCircle size={17} style={{ marginRight: "6px" }} />
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RequestDetails.propTypes = {
  open: PropTypes.bool,
  request: PropTypes.object,
  handleClose: PropTypes.func,
  handleApprove: PropTypes.func,
  handleDecline: PropTypes.func,
};

export default RequestDetails;
