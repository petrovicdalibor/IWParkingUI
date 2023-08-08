import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../../context/authProvider";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

const useAuth = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const login = async (email, password) => {
    const loginResult = await axios
      .post("/api/Auth/Login", {
        email,
        password,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }

        return res;
      });

    return loginResult;
  };

  const signUp = async (
    name,
    surname,
    email,
    password,
    confirmPassword,
    phone,
    role
  ) => {
    const signUpResult = await axios
      .post("/api/Auth/Register", {
        name,
        surname,
        email,
        password,
        confirmPassword,
        phone,
        role,
      })
      .then((res) => {
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }
        return res;
      });
    return signUpResult;
  };

  const fetchUser = async (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const fetchUserResult = await axios
      .get(`/api/User/Get/${decodedToken.Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }
        return res;
      });
    return fetchUserResult;
  };

  const verifyToken = (token) => {
    if (token != undefined) {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));

      userContext.setUser(decodedJwt);
      userContext.setIsLoggedIn(true);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        return false;
      }
      return true;
    } else {
      userContext.setIsLoggedIn(false);
      return false;
    }
  };

  const logout = () => {
    cookies.remove("token");
    userContext.setIsLoggedIn(false);
    userContext.setUser({});
    navigate("/");
  };

  return { login, logout, signUp, fetchUser, verifyToken };
};

export default useAuth;
