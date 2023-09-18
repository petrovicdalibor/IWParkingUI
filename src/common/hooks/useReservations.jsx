import { useContext } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { ReservationsContext } from "../../context/reservationsProvider";

const useReservations = () => {
  const cookies = new Cookies();

  const reservationsContext = useContext(ReservationsContext);

  const fetchReservations = async ({ page, pageSize = 5 }) => {
    const fetchReservationsResult = await axios
      .get(
        `/api/Reservation/GetByUser?pageNumber=${
          page || reservationsContext.reservationsPage
        }&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        reservationsContext.setReservations(res.data.reservations);
        reservationsContext.setReservationsPages(res.data.numPages);
        reservationsContext.setReservationsPage(page);
        return res.data.reservations;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    return fetchReservationsResult;
  };

  const makeReservation = async (
    startDate,
    startTime,
    endDate,
    endTime,
    parkingLotId,
    plateNumber
  ) => {
    const makeReservationResult = await axios
      .post(
        `/api/Reservation/Make`,
        {
          startDate,
          startTime,
          endDate,
          endTime,
          parkingLotId,
          plateNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    await fetchReservations({ page: reservationsContext.reservationsPage });
    return makeReservationResult;
  };

  const cancelReservation = async (reservationId) => {
    const reservations = [...reservationsContext.reservations];

    const reservation = reservations.find((r) => {
      return r.id === reservationId;
    });

    reservation.type = "Cancelled";

    console.log(reservations);

    reservationsContext.setReservations(reservations);

    const cancelReservationResult = await axios
      .delete(`/api/Reservation/Cancel/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    await fetchReservations({ page: reservationsContext.reservationsPage });

    return cancelReservationResult;
  };

  return {
    fetchReservations,
    makeReservation,
    cancelReservation,
  };
};

export default useReservations;
