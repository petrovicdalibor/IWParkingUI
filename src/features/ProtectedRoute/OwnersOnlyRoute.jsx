import Cookies from "universal-cookie";

import { Navigate, Outlet } from "react-router";

const OwnersOnlyRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.Role !== "Owner") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default OwnersOnlyRoute;
