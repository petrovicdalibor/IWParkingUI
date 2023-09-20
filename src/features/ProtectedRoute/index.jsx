import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../../common/hooks/useAuth";
import Cookies from "universal-cookie";
import useParkingLots from "../../common/hooks/useParkingLots";

import {
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
} from "../../common/constants/routes";
import useVehicles from "../../common/hooks/useVehicles";
import useReservations from "../../common/hooks/useReservations";

const Routes = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const { verifyToken, setUserInfo, fetchUserVehicles } = useAuth();
  const { fetchFavoriteLots, fetchParkingZones, fetchCities, fetchRequests } =
    useParkingLots();
  const { fetchVehicleTypes } = useVehicles();
  const { fetchReservations } = useReservations();

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

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!userContext.isLoggedIn ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
