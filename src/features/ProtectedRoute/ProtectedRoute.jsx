import { Navigate, Outlet } from "react-router";

import Cookies from "universal-cookie";

import useAuth from "../../common/hooks/useAuth";

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { verifyToken } = useAuth();

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
