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
import RequestDetailsItem from "./RequestDetailsItem";

const RequestDetails = ({
  open,
  request,
  handleClose,
  handleApprove,
  handleDecline,
}) => {
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
          <RequestDetailsItem
            label="Name"
            oldValue={request.oldParkingLot?.name}
            newValue={request.parkingLot.name}
          />
          <RequestDetailsItem
            label="City"
            oldValue={request.oldParkingLot?.city}
            newValue={request.parkingLot.city}
          />
          <RequestDetailsItem
            label="Address"
            oldValue={request.oldParkingLot?.address}
            newValue={request.parkingLot.address}
          />
          <RequestDetailsItem
            label="Zone"
            oldValue={request.oldParkingLot?.zone}
            newValue={request.parkingLot.zone}
          />
          <RequestDetailsItem
            label="Working Hours"
            oldValue={`${request.oldParkingLot?.workingHourFrom.slice(
              0,
              -3
            )} - ${request.oldParkingLot?.workingHourTo.slice(0, -3)}`}
            newValue={`${request.parkingLot.workingHourFrom.slice(
              0,
              -3
            )} - ${request.parkingLot.workingHourTo.slice(0, -3)}`}
          />
          <RequestDetailsItem
            label="Car Capacity"
            oldValue={request.oldParkingLot?.capacityCar}
            newValue={request.parkingLot.capacityCar}
          />
          <RequestDetailsItem
            label="Adapted Car Capacity"
            oldValue={request.oldParkingLot?.capacityAdaptedCar}
            newValue={request.parkingLot.capacityAdaptedCar}
          />
          <RequestDetailsItem
            label="Price"
            oldValue={request.oldParkingLot?.price}
            newValue={request.parkingLot.price}
          />

          <RequestDetailsItem
            label="Owner"
            oldValue={request.user.name}
            newValue={request.user.name}
          />
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: "24px", pb: "16px" }}>
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
