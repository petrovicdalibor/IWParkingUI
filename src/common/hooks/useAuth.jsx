import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../../context/authProvider";
import Cookies from "universal-cookie";
// import { useNavigate } from "react-router";

const useAuth = () => {
  const cookies = new Cookies();
  // const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const setUserInfo = async (id) => {
    try {
      await fetchUser(id).then((res) => {
        userContext.setUser(res);
        // console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        const decodedToken = JSON.parse(atob(res.data.token.split(".")[1]));

        cookies.set("token", res.data.token, {
          expires: new Date(decodedToken.exp * 1000),
        });

        setUserInfo(decodedToken.Id);
        userContext.setIsLoggedIn(true);
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

  const fetchUser = async (id) => {
    const fetchUserResult = await axios
      .get(`/api/User/Get/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }
        return res.data.user;
      });
    return fetchUserResult;
  };

  const updateUserInfo = async (id, name, surname, email, phone) => {
    const updateUserInfoResult = await axios
      .put(
        `/api/User/Update/${id}`,
        {
          name: name,
          surname: surname,
          email: email,
          phoneNumber: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode !== 200) {
          throw res.data.message;
        }
        userContext.setUser({
          ...userContext.user,
          name: res.data.user.name,
          surname: res.data.user.surname,
          email: res.data.user.email,
          phone: res.data.user.phone,
        });
        return res;
      });
    return updateUserInfoResult;
  };

  const verifyToken = (token) => {
    if (token != undefined) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    cookies.remove("token");
    userContext.setIsLoggedIn(false);
    userContext.setUser({});
  };

  return {
    login,
    logout,
    signUp,
    fetchUser,
    updateUserInfo,
    setUserInfo,
    verifyToken,
  };
};

export default useAuth;
