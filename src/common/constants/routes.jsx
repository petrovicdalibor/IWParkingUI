import Layout from "../../layouts/Layout";
import ProtectedRoute from "../../features/ProtectedRoute/ProtectedRoute";
import Favorites from "../../pages/Favorites.jsx";
import Home from "../../pages/Home.jsx";
import MyProfile from "../../pages/MyProfile.jsx";
import Reservations from "../../pages/Reservations.jsx";
import AddParking from "../../pages/AddParking.jsx";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import UsersOnlyRoute from "../../features/ProtectedRoute/UsersOnlyRoute";
import OwnersOnlyRoute from "../../features/ProtectedRoute/OwnersOnlyRoute";
import AdminsOnlyRoute from "../../features/ProtectedRoute/AdminsOnlyRoute";
import Users from "../../pages/Users";

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

// routes accessible only to normal users
const routesForUsersOnly = [
  {
    path: "/",
    element: <UsersOnlyRoute />,
    children: [
      {
        path: "/reservations",
        element: <Reservations />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
];

// routes accessible only to owner users
const routesForOwnersOnly = [
  {
    path: "/",
    element: <OwnersOnlyRoute />,
    children: [
      {
        path: "/add-parking",
        element: <AddParking />,
      },
    ],
  },
];

// routes accessible only to admin users
const routesForAdminsOnly = [
  {
    path: "/",
    element: <AdminsOnlyRoute />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
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
          ...routesForUsersOnly,
          ...routesForOwnersOnly,
          ...routesForAdminsOnly,
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
