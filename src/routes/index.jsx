import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../features/pages/SignupMobile";
import Login from "../features/pages/LoginMobile";
import MyProfile from "../pages/MyProfile";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthProvider";
import { Layout } from "../layouts/Layout";

const Routes = () => {
  const { token } = useAuth();

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
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <div>User Home Page</div>,
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
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
