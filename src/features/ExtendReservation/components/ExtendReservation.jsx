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
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BsPencilSquare, BsXCircle, BsClock } from "react-icons/bs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";

import isToday from "dayjs/plugin/isToday";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(isToday);
dayjs.extend(timezone);

const ExtendReservation = ({
  open,
  reservation,
  handleClose,
  handleExtend,
}) => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [initialToDate, setInitialToDate] = useState(dayjs());

  useEffect(() => {
    const endDate = reservation.endDate.split("T")[0];
    const endDateTime = dayjs(endDate + "T" + reservation.endTime).tz(
      "Europe/Belgrade"
    );
    const startDate = reservation.startDate.split("T")[0];
    const startDateTime = dayjs(startDate + "T" + reservation.startTime).tz(
      "Europe/Belgrade"
    );

    setFromDate(startDateTime);
    setToDate(endDateTime);
    setInitialToDate(endDateTime);
  }, [reservation]);

  const shouldDisableDate = (date) => {
    return date < initialToDate.subtract(1, "days");
  };

  const shouldDisableTime = (date) => {
    if (initialToDate.isSame(date, "days")) {
      return date < initialToDate;
    }

    return false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { maxWidth: "none", pt: mdDown ? 3 : 0 } }}
    >
      <DialogTitle id="alert-dialog-title">
        Extend Reservation #{reservation.id}
        <Typography variant="body2" ml={0.1}>
          Reservation for {reservation.parkingLot.name}
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
      <DialogContent sx={{ pt: 0.8 }}>
        <Typography variant="body2" mb={0.5}>
          Working Hours
        </Typography>
        <Typography variant="body2" mb={1}>
          <BsClock size={17} style={{ marginRight: "6px" }} color="#CF0018" />
          {reservation?.parkingLot.workingHourFrom?.slice(0, -3)} -{" "}
          {reservation?.parkingLot.workingHourTo?.slice(0, -3)}
        </Typography>
        <Grid
          container
          direction={mdDown ? "column" : "row"}
          gap={2}
          alignItems="center"
        >
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                reduceAnimations={true}
                value={fromDate}
                ampm={false}
                disablePast
                disabled
              />
            </LocalizationProvider>
          </Grid>
          <Grid item textAlign="center">
            <Typography variant="body2" sx={{ color: "#757575" }}>
              until
            </Typography>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                reduceAnimations={true}
                value={toDate}
                ampm={false}
                disablePast
                shouldDisableDate={shouldDisableDate}
                shouldDisableTime={shouldDisableTime}
                onChange={(val) => {
                  setToDate(val);
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: "24px", pb: "16px" }}>
        <Button
          onClick={() => {
            handleClose();
          }}
          variant="contained"
          color="primary"
          size="large"
        >
          <BsXCircle size={17} style={{ marginRight: "6px" }} />
          Close
        </Button>
        <Button
          onClick={() => {
            handleExtend(dayjs(toDate));
            handleClose();
          }}
          variant="contained"
          color="success"
          size="large"
          autoFocus
        >
          <BsPencilSquare size={17} style={{ marginRight: "6px" }} />
          Extend
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ExtendReservation.propTypes = {
  open: PropTypes.bool,
  reservation: PropTypes.object,
  handleClose: PropTypes.func,
  handleExtend: PropTypes.func,
};

export default ExtendReservation;
