import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Cookies from "universal-cookie";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../../context/authProvider";

const AuthVerify = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  let location = useLocation();

  const { logout } = useAuth();

  useEffect(() => {
    const token = cookies.get("token");

    if (token !== undefined) {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));

      userContext.setUser(decodedJwt);
      userContext.setIsLoggedIn(true);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }, [location]);

  return;
};

export default AuthVerify;
