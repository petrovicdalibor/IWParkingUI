import React, { useContext } from "react";
import { AuthContext } from "../context/authProvider";

const Favorites = () => {
  const userContext = useContext(AuthContext);
  return <div>{console.log(userContext)}Favorites</div>;
};

export default Favorites;
