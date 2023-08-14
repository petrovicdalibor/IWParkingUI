import { useContext } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { ParkingContext } from "../../context/parkingProvider";

const useParkingLots = () => {
  const cookies = new Cookies();
  const parkingContext = useContext(ParkingContext);

  const fetchParkingLots = async () => {
    const fetchParkingLotsResult = await axios
      .get("/api/ParkingLot/GetAll")
      .then((res) => {
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }

        parkingContext.setParkingLots(res.data.parkingLots);

        return res.data;
      });
    return fetchParkingLotsResult;
  };

  const addToFavorites = async (userId, parkingLotId) => {
    const addToFavoritesResult = await axios
      .post(
        `/api/ParkingLot/MakeParkingLotFavourite/${userId},${parkingLotId}`,
        {
          userId,
          parkingLotId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }

        // userContext.setVehicles([
        //   ...userContext.vehicles,
        //   {
        //     id: res.data.vehicle.id,
        //     plateNumber: res.data.vehicle.plateNumber,
        //     type: res.data.vehicle.type,
        //     isPrimary: res.data.vehicle.isPrimary,
        //     userId: res.data.vehicle.userId,
        //   },
        // ]);
        return res.data.message;
      })
      .catch((res) => {
        throw res;
      });
    return addToFavoritesResult;
  };

  return { fetchParkingLots, addToFavorites };
};

export default useParkingLots;
