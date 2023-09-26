import { CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useParkingLots from "../common/hooks/useParkingLots";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";
import { toastError } from "../common/utils/toasts";
import { RequestsContext } from "../context/requestsProvider";

const Requests = () => {
  const requestsContext = useContext(RequestsContext);

  const { fetchRequests } = useParkingLots();

  const [currentPage, setCurrentPage] = useState(requestsContext.requestsPage);

  const handleFetchRequests = async (page) => {
    await fetchRequests({ page }).catch((err) => {
      const toastId = "fetchRequest-error";
      toastError(err, { toastId });
    });
  };

  const handleChangePage = (e, value) => {
    setCurrentPage(value);
    handleFetchRequests(value);
  };

  useEffect(() => {
    handleFetchRequests(currentPage);
    setCurrentPage(requestsContext.requestsPage);
  }, []);

  useEffect(() => {
    setCurrentPage(requestsContext.requestsPage);
  }, [requestsContext.requestsPage]);

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
        justifyContent={requestsContext.isLoading && "center"}
        alignItems={requestsContext.isLoading && "center"}
        height={requestsContext.isLoading && "60vh"}
      >
        {requestsContext.isLoading ? (
          <Grid
            item
            alignContent={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {requestsContext.requests.map((request) => {
              return (
                <ParkingLotsCard
                  parking={request.parkingLot}
                  request={request}
                  key={request.id}
                />
              );
            })}
            <Grid
              item
              width="100%"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              <Pagination
                count={requestsContext.requestsPages}
                disabled={requestsContext.requestsPages === 1}
                color="primary"
                page={currentPage}
                onChange={handleChangePage}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Requests;
