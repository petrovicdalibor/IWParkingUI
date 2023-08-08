import { useEffect } from "react";
// import { AuthContext } from "../../context/authProvider";
import { Outlet, useNavigate } from "react-router";

import { Layout } from "../../layouts/Layout";

import Cookies from "universal-cookie";
import useAuth from "../../common/hooks/useAuth";

const ProtectedRoute = () => {
  // const userContext = useContext(AuthContext);
  const cookies = new Cookies();

  const navigate = useNavigate();
  const pathname = window.location;
  const { verifyToken } = useAuth();

  useEffect(() => {
    if (!verifyToken(cookies.get("token"))) {
      navigate("/login");
    }
  }, [pathname]);

  // if (!userContext.isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default ProtectedRoute;
