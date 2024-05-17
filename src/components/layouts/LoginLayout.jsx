import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { CustomerContext } from "../../context/CustomerContext";

const LoginLayout = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(CustomerContext);

  useEffect(() => {
    if (loggedIn == 0) return;
    if (loggedIn === 1) navigate("/");
  }, [loggedIn]);

  if (loggedIn == 0) return <Skeleton />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
