import { useContext } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { ParkingContext } from "../../context/parkingProvider";
import { AuthContext } from "../../context/authProvider";
import { FilterContext } from "../../context/filterContext";
import { RequestsContext } from "../../context/requestsProvider";

const useParkingLots = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const filterContext = useContext(FilterContext);
  const parkingContext = useContext(ParkingContext);
  const requestsContext = useContext(RequestsContext);

  const token =
    cookies.get("token") === undefined
      ? null
      : `Bearer ${cookies.get("token")}`;

  const fetchCities = async () => {
    const fetchCitiesResult = await axios
      .get("/api/City/GetAll", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        filterContext.setCities(res.data.cities);
      })
      .catch((err) => {
        throw err;
      });

    return fetchCitiesResult;
  };

  const fetchParkingZones = async () => {
    const fetchParkingZonesResult = await axios
      .get("/api/Zone/GetAll", {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        filterContext.setZones(res.data.zones);
      })
      .catch((err) => {
        throw err;
      });

    return fetchParkingZonesResult;
  };

  const fetchParkingLots = async ({ page, pageSize = 5, status = "" }) => {
    if (page) {
      parkingContext.setPageNumber(page);
    }
    const fetchParkingLotsResult = await axios
      .post(
        `/api/ParkingLot/GetAll?pageNumber=${
          page || parkingContext.pageNumber
        }&pageSize=${pageSize}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        parkingContext.setParkingLots(res.data.parkingLots);

        return res.data;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return fetchParkingLotsResult;
  };

  const fetchParkingLot = async (id) => {
    const fetchParkingLotResult = await axios
      .get(`/api/ParkingLot/Get/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res.data.parkingLot;
      })
      .catch((err) => {
        throw err.response.data.errors[0];
      });
    return fetchParkingLotResult;
  };

  const fetchRequests = async ({ page, pageSize = 2 }) => {
    const fetchParkingLotsResult = await axios
      .get(`/api/Request/GetAll?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        requestsContext.setRequests(res.data.requests);
        requestsContext.setRequestsPages(res.data.numPages);
        requestsContext.setRequestsPage(page);
        requestsContext.setIsLoading(false);
        return res;
      })
      .catch((err) => {
        throw err.response.data.errors[0];
      });
    return fetchParkingLotsResult;
  };

  const fetchFavoriteLots = async ({ page, pageSize = 5 }) => {
    if (page) {
      userContext.setFavoritePage(page);
    }

    const addToFavoritesResult = await axios
      .get(
        `/api/ParkingLot/GetUserFavouriteParkingLots?pageNumber=${
          page || userContext.favoritePage
        }&pageSize=${pageSize}`,

        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        userContext.setFavorites(res.data.parkingLots);
        userContext.setFavoritePages(res.data.numPages);
        userContext.setFavoritePage(page);
        return res.data.parkingLots;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return addToFavoritesResult;
  };

  const addFavorite = async (parkingLotId) => {
    const parkingLot = parkingContext.parkingLots.find((parking) => {
      return parking.id === parkingLotId;
    });

    parkingLot.isFavourite = true;

    const addFavoriteResult = await axios
      .post(
        `/api/ParkingLot/MakeParkingLotFavourite/${parkingLotId}`,
        { parkingLotId },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        fetchParkingLots({ page: parkingContext.pageNumber });
        fetchFavoriteLots({ page: 1 });

        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return addFavoriteResult;
  };

  const removeFavorite = async (parkingLotId) => {
    const parkingLot = parkingContext.parkingLots?.find((parking) => {
      return parking.id === parkingLotId;
    });

    let pageNum = userContext.favoritePage;

    if (parkingLot) {
      parkingLot.isFavourite = false;
    }

    if (userContext.favorites.length === 1) {
      pageNum -= 1;
      userContext.setFavoritePage(pageNum);
    }

    const removeFavoriteResult = await axios
      .delete(`/api/ParkingLot/RemoveParkingLotFavourite/${parkingLotId}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        fetchParkingLots({ page: parkingContext.pageNumber });

        fetchFavoriteLots({ page: pageNum });

        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    return removeFavoriteResult;
  };

  const modifyRequest = async (id, action) => {
    let pageNum = requestsContext.requestsPage;
    if (requestsContext.requests.length === 1) {
      pageNum -= 1;
      requestsContext.setRequestsPage(pageNum);
    }

    const modifyRequestResult = await axios
      .put(
        `/api/Request/Modify/${id}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        fetchRequests({ page: pageNum });

        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return modifyRequestResult;
  };

  const deactivateParkingLot = async (parkingLotId) => {
    const deactivateParkingLotResult = await axios
      .delete(`/api/ParkingLot/Deactivate/${parkingLotId}`, {
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

  const addParkingLot = async (
    name,
    city,
    zone,
    address,
    workingHourFrom,
    workingHourTo,
    capacityCar,
    capacityAdaptedCar,
    price
  ) => {
    const addParkingLotResult = await axios
      .post(
        `/api/ParkingLot/Create`,
        {
          name,
          city,
          zone,
          address,
          workingHourFrom,
          workingHourTo,
          capacityCar,
          capacityAdaptedCar,
          price,
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
        throw err.response.data.errors[0];
      });
    return addParkingLotResult;
  };

  const editParkingLot = async (
    name,
    city,
    zone,
    address,
    workingHourFrom,
    workingHourTo,
    capacityCar,
    capacityAdaptedCar,
    price,
    parkingLotId
  ) => {
    const editParkingLotResult = await axios
      .put(
        `/api/ParkingLot/Update/${parkingLotId}`,
        {
          name,
          city,
          zone,
          address,
          workingHourFrom,
          workingHourTo,
          capacityCar,
          capacityAdaptedCar,
          price,
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
    return editParkingLotResult;
  };

  return {
    fetchCities,
    fetchParkingZones,
    fetchParkingLots,
    fetchParkingLot,
    fetchRequests,
    fetchFavoriteLots,
    addFavorite,
    removeFavorite,
    addParkingLot,
    editParkingLot,
    modifyRequest,
    deactivateParkingLot,
  };
};

export default useParkingLots;
