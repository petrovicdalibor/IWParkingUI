import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../../context/authProvider";
import Cookies from "universal-cookie";
// import { useNavigate } from "react-router";

const useVehicles = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);

  const addVehicle = async (userId, plateNumber, type) => {
    const addVehicleResult = await axios
      .post(
        `/api/Vehicle/Create`,
        {
          userId,
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

        return res.data.vehicles;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return deleteVehicleResult;
  };

  const makePrimaryVehicle = async (userId, vehicleId) => {
    const addVehicleResult = await axios
      .post(
        `/api/Vehicle/MakePrimary/${userId},${vehicleId}`,
        {
          userId,
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
      });
    return addVehicleResult;
  };

  return {
    addVehicle,
    deleteVehicle,
    makePrimaryVehicle,
  };
};

export default useVehicles;
