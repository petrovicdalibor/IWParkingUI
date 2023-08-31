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
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {console.log(request)}
      <DialogTitle id="alert-dialog-title">
        {`Request #${request.id}`}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container direction="column">
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.name}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>City</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.city}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Address</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.address}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Zone</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.zone}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Working Hours</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>
                {`${request.parkingLot.workingHourFrom.slice(
                  0,
                  -3
                )} - ${request.parkingLot.workingHourTo.slice(0, -3)}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Car Capacity</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.capacityCar}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Adapted Car Capacity</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.capacityAdaptedCar}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Price</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.parkingLot.price} eur/hr</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" p>
            <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
              <Typography>Owner</Typography>
            </Grid>
            <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
              <Typography>{request.user.name}</Typography>
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
