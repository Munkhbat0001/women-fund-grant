import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../components/layouts/HomeLayout";
import Home from "../pages/Home";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
