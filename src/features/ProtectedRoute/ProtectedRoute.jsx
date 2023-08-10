import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authProvider";
import { Navigate, Outlet } from "react-router";

import Cookies from "universal-cookie";

import { Layout } from "../../layouts/Layout";
import useAuth from "../../common/hooks/useAuth";
import AuthVerify from "../../common/utils/AuthVerify";

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const userContext = useContext(AuthContext);
  const { verifyToken } = useAuth();

  useEffect(() => {
    verifyToken(token);
  }, []);

  // if (!userContext.isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

  if (!verifyToken(token)) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
