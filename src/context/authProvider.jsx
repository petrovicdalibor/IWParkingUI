import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({
  user: {},
  vehicles: [],
  favorites: [],
  favoritePage: 1,
  favoritePages: 1,
  role: "",
  isLoggedIn: false,
  isFetchingUser: true,
  isFetchingFavorites: true,
  // eslint-disable-next-line no-unused-vars
  setUser: (user) => {},
  // eslint-disable-next-line no-unused-vars
  setVehicles: (vehicles) => {},
  // eslint-disable-next-line no-unused-vars
  setFavorites: (parkingLot) => {},
  // eslint-disable-next-line no-unused-vars
  setFavoritePage: (favoritePage) => {},
  // eslint-disable-next-line no-unused-vars
  setFavoritePages: (favoritePages) => {},
  // eslint-disable-next-line no-unused-vars
  setRole: (role) => {},
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (bool) => {},
  // eslint-disable-next-line no-unused-vars
  setIsFetchingUser: (bool) => {},
  // eslint-disable-next-line no-unused-vars
  setIsFetchingFavorites: (bool) => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favoritePage, setFavoritePage] = useState(1);
  const [favoritePages, setFavoritePages] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [isFetchingFavorites, setIsFetchingFavorites] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        favorites,
        favoritePage,
        favoritePages,
        vehicles,
        isLoggedIn,
        isFetchingUser,
        isFetchingFavorites,
        setUser,
        setRole,
        setFavorites,
        setFavoritePage,
        setFavoritePages,
        setVehicles,
        setIsLoggedIn,
        setIsFetchingUser,
        setIsFetchingFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
