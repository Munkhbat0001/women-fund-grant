import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
