import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const RequestDetailsItem = ({ label, oldValue, newValue }) => {
  const oldStyle = { textDecoration: "line-through", color: "#959595" };
  const newStyle = {
    backgroundColor: "#E8FEF1",
    color: "#219653",
  };
  return (
    <Grid item xs={12} display="flex" flexDirection="row">
      <Grid item xs={6} minWidth="224px" sx={{ color: "#757575" }}>
        <Typography p>{label}</Typography>
      </Grid>
      <Grid item xs={6} minWidth="272px" sx={{ color: "#121212" }}>
        {oldValue !== newValue &&
        oldValue !== undefined &&
        oldValue !== `undefined - undefined` ? (
          <>
            <Typography sx={oldStyle} p>
              {console.log(oldValue)}
              {oldValue}
            </Typography>
            <Typography sx={newStyle} p>
              {newValue}
            </Typography>
          </>
        ) : (
          <Typography p>{newValue}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

RequestDetailsItem.propTypes = {
  label: PropTypes.string,
  oldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  newValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default RequestDetailsItem;
