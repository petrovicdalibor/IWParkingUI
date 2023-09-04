import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../../context/authProvider";
import Cookies from "universal-cookie";
import useAuth from "../hooks/useAuth";
import { FilterContext } from "../../context/filterContext";

const useVehicles = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const filterContext = useContext(FilterContext);
  const { setUserVehicles } = useAuth();

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
        throw err.response.data.errors[0];
      });
    return addVehicleResult;
  };

  const deleteVehicle = async (id) => {
    const deleteVehicleResult = await axios
      .delete(`/api/Vehicle/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        const vehicleArray = userContext.vehicles.filter((vehicle) => {
          return vehicle.id !== id;
        });
        userContext.setVehicles(vehicleArray);

        setUserVehicles(userContext.user.id);

        return res.data.vehicles;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return deleteVehicleResult;
  };

  const makePrimaryVehicle = async (vehicleId) => {
    const addVehicleResult = await axios
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
    return addVehicleResult;
  };

  return {
    fetchVehicleTypes,
    addVehicle,
    deleteVehicle,
    makePrimaryVehicle,
  };
};

export default useVehicles;
