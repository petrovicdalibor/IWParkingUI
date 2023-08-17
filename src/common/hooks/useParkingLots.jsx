import { useContext } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { ParkingContext } from "../../context/parkingProvider";
import { AuthContext } from "../../context/authProvider";

const useParkingLots = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const parkingContext = useContext(ParkingContext);

  const fetchParkingLots = async () => {
    const fetchParkingLotsResult = await axios
      .get("/api/ParkingLot/GetAll")
      .then((res) => {
        parkingContext.setParkingLots(res.data.parkingLots);

        return res.data;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return fetchParkingLotsResult;
  };

  const fetchFavoriteLots = async (userId) => {
    const addToFavoritesResult = await axios
      .get(
        `/api/ParkingLot/GetUserFavouriteParkingLots/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        userContext.setFavorites(res.data.parkingLots);
        return res.data.parkingLots;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return addToFavoritesResult;
  };

  const addFavorite = async (userId, parkingLotId) => {
    const addFavoriteResult = await axios
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
        userContext.setFavorites([
          ...userContext.favorites,
          res.data.parkingLot,
        ]);

        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return addFavoriteResult;
  };
  const removeFavorite = async (userId, parkingLotId) => {
    const removeFavoriteResult = await axios
      .delete(
        `/api/ParkingLot/RemoveParkingLotFavourite/${userId},${parkingLotId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        const favoritesArray = userContext.favorites.filter((favorite) => {
          return favorite.id !== parkingLotId;
        });
        userContext.setFavorites(favoritesArray);

        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return removeFavoriteResult;
  };

  const deactivateParkingLot = async (parking) => {
    const deactivateParkingLotResult = await axios
      .delete(`/api/ParkingLot/Deactivate/${parking.id}`, {
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
    return deactivateParkingLotResult;
  };

  return {
    fetchParkingLots,
    fetchFavoriteLots,
    addFavorite,
    removeFavorite,
    deactivateParkingLot,
  };
};

export default useParkingLots;
