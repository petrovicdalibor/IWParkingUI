import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../../context/authProvider";
import Cookies from "universal-cookie";
import { FilterContext } from "../../context/filterContext";

const useVehicles = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const filterContext = useContext(FilterContext);

  const fetchVehicleTypes = async () => {
    const fetchVehicleTypesResult = await axios
      .get("/api/Vehicle/GetVehicleTypes", {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        filterContext.setVehicleTypes(res.data.vehicleTypes);
      })
      .catch((err) => {
        throw err;
      });

    return fetchVehicleTypesResult;
  };

  const addVehicle = async (plateNumber, type) => {
    const addVehicleResult = await axios
      .post(
        `/api/Vehicle/Create`,
        {
          plateNumber,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        userContext.setVehicles([
          ...userContext.vehicles,
          {
            id: res.data.vehicle.id,
            plateNumber: res.data.vehicle.plateNumber,
            type: res.data.vehicle.type,
            isPrimary: res.data.vehicle.isPrimary,
            userId: res.data.vehicle.userId,
          },
        ]);
        return res.data.message;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return addVehicleResult;
  };

  const deleteVehicle = async (id) => {
    const vehicles = [...userContext.vehicles];

    const vehicle = vehicles.find((v) => {
      return v.id === id;
    });

    const vehicleId = vehicles.indexOf((v) => {
      return v.id === id;
    });

    if (vehicle.isPrimary === true && vehicles[0] !== undefined) {
      vehicles[0].isPrimary = true;
    }

    vehicles.splice(vehicleId, 1);

    userContext.setVehicles(vehicles);

    const deleteVehicleResult = await axios
      .delete(`/api/Vehicle/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res.data.vehicles;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    // await setUserVehicles(userContext.user.id);

    return deleteVehicleResult;
  };

  const makePrimaryVehicle = async (vehicleId) => {
    const vehicles = [...userContext.vehicles];
    const vehicle = vehicles.find((v) => {
      return v.id === vehicleId;
    });

    const primaryVehicle = vehicles.find((v) => {
      return v.isPrimary === true;
    });

    primaryVehicle.isPrimary = false;
    vehicle.isPrimary = true;

    userContext.setVehicles(vehicles);

    const makePrimaryVehicleResult = await axios
      .post(
        `/api/Vehicle/MakePrimary/${vehicleId}`,
        {
          vehicleId,
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

        const arr = userContext.vehicles.map((vehicle) =>
          vehicle.isPrimary ? { ...vehicle, isPrimary: false } : vehicle
        );
        const editedVehicles = arr.map((vehicle2) =>
          vehicle2.id === vehicleId
            ? { ...vehicle2, isPrimary: true }
            : vehicle2
        );

        userContext.setVehicles(editedVehicles);

        return res.data.vehicles;
      })
      .catch((err) => {
        throw err;
      });
    return makePrimaryVehicleResult;
  };

  return {
    fetchVehicleTypes,
    addVehicle,
    deleteVehicle,
    makePrimaryVehicle,
  };
};

export default useVehicles;
