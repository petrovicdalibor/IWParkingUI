import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import PropTypes from "prop-types";

const ConfirmDialog = ({ onConfirm, onCancel, open, text }) => {
  if (!open) {
    return false;
  }

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          No
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.string,
};

export default ConfirmDialog;
