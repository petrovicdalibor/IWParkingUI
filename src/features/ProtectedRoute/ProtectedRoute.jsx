import { useEffect } from "react";
// import { AuthContext } from "../../context/authProvider";
import { Outlet, useNavigate } from "react-router";

import { Layout } from "../../layouts/Layout";
// import AuthVerify from "../../common/utils/AuthVerify";
import useAuth from "../../common/hooks/useAuth";

import Cookies from "universal-cookie";

const ProtectedRoute = () => {
  // const userContext = useContext(AuthContext);

  const navigate = useNavigate();
  const cookies = new Cookies();
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
      {/* <AuthVerify /> */}
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default ProtectedRoute;
