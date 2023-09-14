import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../../context/authProvider";
import Cookies from "universal-cookie";
import useParkingLots from "./useParkingLots";

const useAuth = () => {
  const cookies = new Cookies();
  const userContext = useContext(AuthContext);
  const { fetchFavoriteLots } = useParkingLots();

  const setUserInfo = async () => {
    try {
      await fetchUser().then((res) => {
        userContext.setUser(res);
        userContext.setIsLoggedIn(true);
        userContext.setIsFetchingUser(false);
      });
    } catch (err) {
      return err;
    }
  };

  const setUserVehicles = async (id) => {
    try {
      await fetchUserVehicles(id).then((res) => {
        userContext.setVehicles(res);
      });
    } catch (err) {
      return err;
    }
  };

  const fetchUserVehicles = async () => {
    const fetchUserVehiclesResult = await axios
      .get(`/api/Vehicle/GetByUserId`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res.data.vehicles;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return fetchUserVehiclesResult;
  };

  const login = async (email, password) => {
    const loginResult = await axios
      .post("/api/Auth/Login", {
        email,
        password,
      })
      .then((res) => {
        const decodedToken = JSON.parse(atob(res.data.token.split(".")[1]));

        cookies.set("token", res.data.token, {
          expires: new Date(decodedToken.exp * 1000),
          path: "/",
        });

        if (decodedToken.Role === "User") {
          setUserVehicles(decodedToken.Id);
          fetchFavoriteLots({ page: 1 });
        }
        setUserInfo(decodedToken.Id);
        userContext.setRole(decodedToken.Role);
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    return loginResult;
  };

  const deactivateUser = async () => {
    const deactivateUserResult = await axios
      .delete(`/api/User/Deactivate`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    return deactivateUserResult;
  };

  const deactivateUserById = async (userId) => {
    const deactivateUserResult = await axios
      .delete(`/api/User/Deactivate/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    return deactivateUserResult;
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
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return signUpResult;
  };

  const fetchUser = async () => {
    const fetchUserResult = await axios
      .get(`/api/User/Get`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res.data.user;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return fetchUserResult;
  };

  const updateUserInfo = async (name, surname, email, phone) => {
    const updateUserInfoResult = await axios
      .put(
        `/api/User/Update`,
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
        userContext.setUser({
          ...userContext.user,
          name: res.data.user.name,
          surname: res.data.user.surname,
          email: res.data.user.email,
          phoneNumber: res.data.user.phoneNumber,
        });
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });

    return updateUserInfoResult;
  };

  const changePassword = async (
    email,
    currentPassword,
    newPassword,
    confirmPassword
  ) => {
    const updateUserInfoResult = await axios
      .post(
        `/api/Auth/ChangePassword`,
        {
          email: email,
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
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

  const fetchAllUsers = async ({ page, pageSize = 5 }) => {
    const fetchAllUsersResult = await axios
      .get(`/api/User/GetAll?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err.response.data.Errors[0];
      });
    return fetchAllUsersResult;
  };

  const logout = () => {
    cookies.remove("token", { path: "/" });

    userContext.setIsLoggedIn(false);
    userContext.setVehicles([]);
    userContext.setFavorites([]);
    userContext.setUser({});
    userContext.setRole("");
  };

  return {
    login,
    logout,
    deactivateUser,
    deactivateUserById,
    signUp,
    fetchUser,
    fetchAllUsers,
    fetchUserVehicles,
    updateUserInfo,
    changePassword,
    setUserInfo,
    setUserVehicles,
    verifyToken,
  };
};

export default useAuth;
