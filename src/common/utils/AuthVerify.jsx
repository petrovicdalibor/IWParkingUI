import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Cookies from "universal-cookie";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../../context/authProvider";

const AuthVerify = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  let location = useLocation();

  const { verifyToken, setUserInfo } = useAuth();

  useEffect(() => {
    const token = cookies.get("token");

    if (verifyToken(token)) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      setUserInfo(decodedToken.Id);
      userContext.setIsLoggedIn(true);
    }
  }, [location]);

  return;
};

export default AuthVerify;
