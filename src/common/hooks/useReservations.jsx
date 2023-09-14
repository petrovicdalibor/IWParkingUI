import axios from "../api/axios";
import Cookies from "universal-cookie";

const useReservations = () => {
  const cookies = new Cookies();

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
        console.log(res);
      })
      .catch((err) => {
        throw err.response.data.errors[0];
      });
    return makeReservationResult;
  };

  const cancelReservation = async (reservationId) => {
    const cancelReservationResult = await axios
      .get(`/api/Reservation/Cancel/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return cancelReservationResult;
  };

  return {
    makeReservation,
    cancelReservation,
  };
};

export default useReservations;
