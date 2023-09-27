import { Grid, Typography } from "@mui/material";
import RequestForm from "../features/ParkingRequest/components/RequestForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useParkingLots from "../common/hooks/useParkingLots";

const AddParking = () => {
  const { id } = useParams();
  const { fetchParkingLot } = useParkingLots();
  const [parkingLot, setParkingLot] = useState({});

  useEffect(() => {
    if (id !== undefined) {
      fetchParkingLot(id).then((res) => {
        setParkingLot(res);
      });
    }
  }, [id]);

  return (
    <>
      <Grid item display="flex" flexDirection="column">
        <Grid item>
          <Typography variant="h2">
            {id ? `Edit ${parkingLot.name}` : "Add parking lot"}
          </Typography>
        </Grid>

        <RequestForm parkingLot={parkingLot} />
      </Grid>
    </>
  );
};

export default AddParking;
