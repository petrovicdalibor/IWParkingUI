import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { toastError } from "../common/utils/toasts";

const Requests = () => {
  const { fetchRequests } = useParkingLots();

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchRequests = async () => {
    await fetchRequests()
      .then((res) => {
        setRequests(res);
        setIsLoading(false);
      })
      .catch((err) => {
        const toastId = "fetchRequest-error";

        toastError(err, { toastId });
      });
  };

  useEffect(() => {
    handleFetchRequests();
  }, []);
  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Requests</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={isLoading && "center"}
        alignItems={isLoading && "center"}
        height={isLoading && "60vh"}
      >
        {isLoading && (
          <Grid
            item
            alignContent={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <CircularProgress />
          </Grid>
        )}
        {requests.map((request) => {
          return (
            <ParkingLotsCard
              parking={request.parkingLotTemp}
              requestId={request.id}
              key={request.id}
              owner={request.user}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Requests;
