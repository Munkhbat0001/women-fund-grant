import React, { useState, useEffect } from "react";
import { useAxios } from "../hooks";

import { CUSTOMER_INFO } from "../utils/operation";

const CustomerContext = React.createContext({});

const CustomerProvider = ({ children }) => {
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
    localStorage.removeItem("customer");
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

    useAxios(CUSTOMER_INFO)
      .then((res) => {
        loginUser(res);
        const customer = JSON.parse(localStorage.getItem("customer"));
        const new_info = {
          ...res,
          token: customer?.token,
        };
        localStorage.setItem("customer", JSON.stringify(new_info));
      })
      .catch((err) => {
        let error = err.response.data || err.message || "Server Error";
        if (error) {
          logoutUser();
        }
      });
  }, [loggedIn]);

  return (
    <CustomerContext.Provider value={contextProps}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
