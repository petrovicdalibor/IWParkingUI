import { useContext, useEffect } from "react";
import { ReservationsContext } from "../context/reservationsProvider";
import useReservations from "../common/hooks/useReservations";
import { Grid, Pagination, Typography } from "@mui/material";
import ParkingLotsCard from "../features/ParkingLots/components/ParkingLotsCard";

const Reservations = () => {
  const reservationsContext = useContext(ReservationsContext);
  const { fetchReservations } = useReservations();

  // const [page, setPage] = useState(1);

  useEffect(() => {
    fetchReservations({ page: reservationsContext.reservationsPage });
  }, []);

  const handlePageChange = (e, value) => {
    fetchReservations({ page: value });
  };

  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Reservations</Typography>
        </Grid>
      </Grid>

      <Grid container>
        {reservationsContext.reservations.length > 0 ? (
          <>
            {reservationsContext.reservations?.map((reservation) => (
              <ParkingLotsCard
                parking={reservation.parkingLot}
                reservation={reservation}
                key={reservation.id}
              />
            ))}

            <Grid
              item
              width="100%"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              <Pagination
                count={reservationsContext.reservationsPages}
                color="primary"
                page={reservationsContext.reservationsPage}
                disabled={reservationsContext.reservationsPages === 1}
                onChange={handlePageChange}
              />
            </Grid>
          </>
        ) : (
          <Typography variant="body1" mt={3}>
            No reservations found.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Reservations;
