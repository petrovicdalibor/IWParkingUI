import Layout from "../../layouts/Layout";
import ProtectedRoute from "../../features/ProtectedRoute/ProtectedRoute";
import Favorites from "../../pages/Favorites.jsx";
import Home from "../../pages/Home.jsx";
import MyProfile from "../../pages/MyProfile.jsx";
import Reservations from "../../pages/Reservations.jsx";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

// routes accessible to all users
export const routesForPublic = [
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
export const routesForAuthenticatedOnly = [
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
        ],
      },
    ],
  },
];

// routes accessible only to non-authenticated users
export const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];
