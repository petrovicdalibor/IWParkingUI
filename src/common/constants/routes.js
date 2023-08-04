import Login from "../../features/pages/LoginMobile.jsx";
import Signup from "../../features/pages/SignupMobile.jsx";
import Favorites from "../../pages/Favorites.jsx";
import Home from "../../pages/Home.jsx";
import MyProfile from "../../pages/MyProfile.jsx";
import Reservations from "../../pages/Reservations.jsx";
import ProtectedRoute from "../../routes/ProtectedRoute.jsx";

export const routesForPublic = [
  {
    path: "/",
    component: Home,
  },
];

export const routesForNotAuthenticatedOnly = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
];

export const routesForAuthenticatedOnly = [
  {
    path: "/",
    component: ProtectedRoute,
    children: [
      {
        path: "/reservations",
        component: Reservations,
      },
      {
        path: "/profile",
        component: MyProfile,
      },
      {
        path: "/favorites",
        component: Favorites,
      },
    ],
  },
];
