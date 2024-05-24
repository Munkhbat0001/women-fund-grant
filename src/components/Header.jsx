import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../constants";
import { navbarVariants, mobileMenuVariants } from "../constants/motion";
import { useResizeX, useScrollY } from "../hooks";
import logoEn from "../assets/logoEn.png";
import { Avatar, Dropdown } from "antd";
import { LoginOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { showConfirm } from "./modals/Confirmation";

const menulist = [
  {
    key: "1",
    label: "Setting",
    icon: <SafetyCertificateOutlined />,
  },
  {
    key: "2",
    label: "Гарах",
    icon: <LoginOutlined />,
  },
];

const Header = ({ user, loggedIn, logout }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const resized = useResizeX(992);
  const scrolled = useScrollY(100);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigate(`/personal`);
    } else if (e.key === "2") {
      showConfirm({ onOk: logout });
    }
  };

  const items = {
    items: menulist,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    if (resized) setToggleMenu(false);
  }, [resized]);

  const onRegisger = () => navigate(`/register`);
  const onLogin = () => navigate(`/login`);

  return (
    <motion.header
      layout
      variants={navbarVariants}
      initial={["default", { y: -100 }]}
      animate={[scrolled ? "active" : "default", "slide"]}
      transition={{ duration: 0.3 }}
      className="fixed flex items-center h-[70px] z-[1000] w-full border border-solid border-transparent shadow-md"
    >
      <nav className="container flex items-center justify-between gap-x-16">
        {/* <a href="/" className="text-2xl font-bold text-gray-10">
          Coursat.
        </a> */}
        <div className="h-[30px] w-[140px] items-center justify-center">
          <a href="#">
            <img
              src={logoEn}
              height="35"
              onClick={() => {
                navigate("/");
              }}
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:justify-between w-full">
          <ul className="flex items-center gap-x-4">
            {navLinks.map((link) => {
              return (
                <li key={link.id}>
                  <a
                    href="#"
                    className="link"
                    onClick={() => {
                      navigate(link.link);
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              );
            })}
          </ul>

          {loggedIn === 1 && (
            <div className="flex items-center gap-4">
              {/* <img
              className="w-10 h-10 rounded-full"
              src="/docs/images/people/profile-picture-5.jpg"
              alt=""
            /> */}
              <Dropdown menu={items}>
                <Avatar
                  style={{
                    backgroundColor: "#00a2ae",
                    verticalAlign: "middle",
                  }}
                  size="large"
                  gap={4}
                >
                  {user.loginName.substring(0, 1).toUpperCase()}
                </Avatar>
              </Dropdown>
              <div className="font-medium dark:text-white">
                <div>
                  {user.loginName.substring(0, user.loginName.indexOf("@"))}
                </div>
              </div>
            </div>
          )}

          {loggedIn !== 1 && (
            <div className="flex items-center gap-x-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={onRegisger}
              >
                Бүртгүүлэх
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onLogin}
              >
                Нэвтрэх
              </button>
            </div>
          )}
        </div>
        <div
          className={`header__menu-icon flex lg:hidden relative w-5 h-4 flex-shrink-0 cursor-pointer overflow-hidden ${
            toggleMenu ? "active" : ""
          }`}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      {/* ====== Mobile Navbar Menu ====== */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.nav
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-0 inset-x-0 h-dvh bg-white -z-10"
          >
            <div className="container flex flex-col justify-between h-full pt-[100px] pb-6">
              <ul className="flex flex-col gap-y-4">
                {navLinks.map((link) => {
                  return (
                    <li key={link.id} className="h-8">
                      <a href={`#${link.id}`} className="link text-xl">
                        {link.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-x-4">
                <button type="button" className="btn btn-outline">
                  Sign Up
                </button>
                <button type="button" className="btn btn-primary">
                  Log In
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
