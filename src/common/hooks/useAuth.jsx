import axios from "../api/axios";

const useAuth = () => {
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

  return { login, signUp };
};

export default useAuth;
