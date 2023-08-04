import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router";
import { Layout } from "../layouts/Layout";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
