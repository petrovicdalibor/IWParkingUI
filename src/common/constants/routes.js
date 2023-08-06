import Favorites from "../../pages/Favorites.jsx";
import Home from "../../pages/Home.jsx";
import MyProfile from "../../pages/MyProfile.jsx";
import Reservations from "../../pages/Reservations.jsx";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/reservations",
    component: Reservations,
  },
  {
    path: "/favorites",
    component: Favorites,
  },
  {
    path: "/profile",
    component: MyProfile,
  },
];

export default routes;
