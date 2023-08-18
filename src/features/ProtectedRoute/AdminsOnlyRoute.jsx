import Cookies from "universal-cookie";

import { Navigate, Outlet } from "react-router";

const AdminsOnlyRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.Role !== "SuperAdmin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminsOnlyRoute;
