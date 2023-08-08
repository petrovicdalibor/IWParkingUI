import { useContext } from "react";
import { AuthContext } from "../../context/authProvider";
import { Navigate, Outlet } from "react-router";

import { Layout } from "../../layouts/Layout";

const ProtectedRoute = () => {
  const userContext = useContext(AuthContext);

  if (!userContext.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
