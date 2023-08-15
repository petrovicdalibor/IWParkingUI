import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authProvider";
import { Layout } from "../../layouts/Layout";
import Home from "../../pages/Home";
import MyProfile from "../../pages/MyProfile";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Reservations from "../../pages/Reservations";
import Favorites from "../../pages/Favorites";
import useAuth from "../../common/hooks/useAuth";
import Cookies from "universal-cookie";
import useParkingLots from "../../common/hooks/useParkingLots";

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
        setUserVehicles(decodedToken.Id);
        fetchFavoriteLots(decodedToken.Id);
        console.log(userContext);
      }
      setUserInfo(decodedToken.Id);
    }
  }, []);

  // routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
  ];

  // routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
          children: [
            {
              path: "/reservations",
              element: <Reservations />,
            },
            {
              path: "/favorites",
              element: <Favorites />,
            },
            {
              path: "/profile",
              element: <MyProfile />,
            },
            {
              path: "/logout",
              element: <div>Logout Page</div>,
            },
          ],
        },
      ],
    },
  ];

  // routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!userContext.isLoggedIn ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
