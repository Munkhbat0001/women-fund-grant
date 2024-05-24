import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../components/layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProjectRequest from "../pages/ProjectRequest";
import LoginLayout from "../components/layouts/LoginLayout";
import MainLayout from "../components/layouts/MainLayout";
import AdminUser from "../pages/admin/AdminUser";
import GrantList from "../pages/admin/GrantList";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/request/:grantId" element={<ProjectRequest />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/admin-user" element={<AdminUser />} />
          <Route path="/grant-list" element={<GrantList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
