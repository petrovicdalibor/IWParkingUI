import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({
  user: {},
  vehicles: [],
  isLoggedIn: false,
  // eslint-disable-next-line no-unused-vars
  setUser: (user) => {},
  // eslint-disable-next-line no-unused-vars
  setVehicles: (vehicles) => {},
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (bool) => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        vehicles,
        isLoggedIn,
        setUser,
        setVehicles,
        setIsLoggedIn,
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
