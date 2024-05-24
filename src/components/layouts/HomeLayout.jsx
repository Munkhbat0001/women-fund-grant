import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Skeleton, Spin } from "antd";
import { SystemContext } from "../../context/SystemContext";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { loggedIn, user, logout, loading } = useContext(SystemContext);

  useEffect(() => {
    if (loggedIn == 0) return;
    if (user.isAdmin === true) navigate("/admin-user");
    // if (loggedIn === 2) navigate("/login");
  }, [loggedIn]);

  if (loggedIn == 0) return <Skeleton />;

  return (
    <>
      <Header user={user} loggedIn={loggedIn} logout={logout} />
      <Spin tip="Loading" spinning={loading}>
        <Outlet />
      </Spin>
      <Footer />
    </>
  );
};

export default HomeLayout;
