import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Skeleton } from "antd";
import { CustomerContext } from "../../context/CustomerContext";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { loggedIn, user, logout } = useContext(CustomerContext);

  useEffect(() => {
    if (loggedIn == 0) return;
    // if (loggedIn === 2) navigate("/login");
  }, [loggedIn]);

  if (loggedIn == 0) return <Skeleton />;

  return (
    <>
      <Header user={user} loggedIn={loggedIn} logout={logout} />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
