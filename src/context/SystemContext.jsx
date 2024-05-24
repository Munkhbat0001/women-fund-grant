import React, { useState, useEffect } from "react";
import { useAxios } from "../hooks";
import { ADMIN_INFO } from "../utils/operation";

const SystemContext = React.createContext({});

const SystemProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(0);
  const [loading, setLoading] = useState(false);

  const loginUser = (user) => {
    setUser(user);
    setLoggedIn(1);
  };

  const logoutUser = () => {
    setUser({});
    setLoggedIn(2);
    localStorage.removeItem("user");
  };

  const logout = () => {
    logoutUser();
  };

  const contextProps = {
    user,
    loggedIn,
    loading,
    setLoading,
    loginUser,
    logout,
  };

  useEffect(() => {
    if (loggedIn !== 0) return;
    const user = JSON.parse(localStorage.getItem("user"));

    useAxios(ADMIN_INFO)
      .then((data) => {
        loginUser(data);
        const new_info = {
          ...data,
          token: user?.token,
        };
        localStorage.setItem("user", JSON.stringify(new_info));
      })
      .catch((err) => {
        let error = err.response.data || err.message || "Server Error";
        if (error) {
          logoutUser();
        }
      });
  }, [loggedIn]);

  return (
    <SystemContext.Provider value={contextProps}>
      {children}
    </SystemContext.Provider>
  );
};

export { SystemContext, SystemProvider };