import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../../common/hooks/useAuth";
import Cookies from "universal-cookie";
import useParkingLots from "../../common/hooks/useParkingLots";
import { toastWarning } from "../../common/utils/toasts";

import {
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
} from "../../common/constants/routes";
import useVehicles from "../../common/hooks/useVehicles";
import useReservations from "../../common/hooks/useReservations";
import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

const Routes = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const { verifyToken, setUserInfo, fetchUserVehicles } = useAuth();
  const { fetchFavoriteLots, fetchParkingZones, fetchCities, fetchRequests } =
    useParkingLots();
  const { fetchVehicleTypes } = useVehicles();
  const { fetchReservations } = useReservations();

  const [connection, setConnection] = useState(
    new HubConnectionBuilder()
      .withUrl("http://localhost:7113/api")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.None)
      .build()
  );

  useEffect(() => {
    const token = cookies.get("token");

    if (token === undefined) {
      userContext.setIsFetchingUser(false);
    }

    if (verifyToken(token)) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      userContext.setRole(decodedToken.Role);
      if (decodedToken.Role === "User") {
        fetchUserVehicles(decodedToken.Id);
        fetchFavoriteLots({ page: 1 });
        fetchVehicleTypes();
        fetchReservations({ page: 1 });
      }
      if (decodedToken.Role === "SuperAdmin" || decodedToken.Role === "Owner") {
        fetchRequests({ page: 1 });
      }
      setUserInfo(decodedToken.Id).then(() => {
        userContext.setIsFetchingUser(false);
      });
    }
    fetchCities();
    fetchParkingZones();
  }, []);

  const startSignalRConnection = async (connection) => {
    try {
      await connection.stop();
      await connection.start();
    } catch (err) {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.error("SignalR Connection Error: ", err);
      setTimeout(() => startSignalRConnection(connection), 5000);
    }
  };

  useEffect(() => {
    const token = cookies.get("token");

    if (userContext.isLoggedIn) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      startSignalRConnection(connection);

      if (userContext.role === "User") {
        connection.on("reservations", (message) => {
          const filteredMessages = message.filter(
            (m) => m.UserId === parseInt(decodedToken.Id)
          );

          let i = 0;

          filteredMessages.forEach((m) => {
            toastWarning(m.Message, {
              autoClose: 7500,
              toastId: `expire-${i}`,
            });
            i++;
          });
        });
      }

      if (userContext.role === "SuperAdmin") {
        connection.on("NewRequest", (message) => {
          toastWarning(message, {
            autoClose: 7500,
            toastId: "admin-notification",
          });
        });
      }
    } else {
      connection.off("reservations", null);
      connection.off("NewRequest", null);

      connection.stop();
    }
  }, [userContext.isLoggedIn]);

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!userContext.isLoggedIn ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
