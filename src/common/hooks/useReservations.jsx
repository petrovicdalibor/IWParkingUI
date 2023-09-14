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
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        },
        {
          startDate,
          startTime,
          endDate,
          endTime,
          parkingLotId,
          plateNumber,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
