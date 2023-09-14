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

const Routes = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const { verifyToken, setUserInfo, setUserVehicles } = useAuth();
  const { fetchFavoriteLots, fetchParkingZones, fetchCities, fetchRequests } =
    useParkingLots();
  const { fetchVehicleTypes } = useVehicles();

  useEffect(() => {
    const token = cookies.get("token");

    if (token === undefined) {
      userContext.setIsFetchingUser(false);
    }

    if (verifyToken(token)) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      userContext.setRole(decodedToken.Role);
      if (decodedToken.Role === "User") {
        setUserVehicles();
        fetchFavoriteLots({ page: 1 });
        fetchVehicleTypes();
      }
      if (decodedToken.Role === "SuperAdmin" || decodedToken.Role === "Owner") {
        fetchRequests({ page: 1 });
      }
      fetchCities();
      fetchParkingZones();
      setUserInfo(decodedToken.Id).then(() => {
        userContext.setIsFetchingUser(false);
      });
    }
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
