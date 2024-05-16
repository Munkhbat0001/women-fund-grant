import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
