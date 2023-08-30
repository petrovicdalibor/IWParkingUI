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

const Routes = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const { verifyToken, setUserInfo, setUserVehicles } = useAuth();
  const { fetchFavoriteLots } = useParkingLots();

  useEffect(() => {
    const token = cookies.get("token");

    if (verifyToken(token)) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      userContext.setRole(decodedToken.Role);
      if (decodedToken.Role === "User") {
        setUserVehicles();
        fetchFavoriteLots();
      }
      setUserInfo(decodedToken.Id);
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
