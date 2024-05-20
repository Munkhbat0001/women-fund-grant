import React, { useContext, useEffect } from "react";
import {
  UserOutlined,
  LoginOutlined,
  BellOutlined,
  MenuOutlined,
  SafetyCertificateOutlined,
  LogoutOutlined,
  GithubFilled,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Space,
  Avatar,
  Dropdown,
  Row,
  Badge,
  Skeleton,
  Button,
  Drawer,
  Spin,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import logoEn from "../../assets/logoEn.png";
import { SystemContext } from "../../context/SystemContext";
import { showConfirm } from "../modals/Confirmation";

const menulist = [
  {
    label: "Нууц үг солих",
    key: "1",
    icon: <SafetyCertificateOutlined />,
  },
  {
    label: "Гарах",
    key: "2",
    icon: <LoginOutlined />,
  },
];

function getItem(name, key, icon, routes) {
  if (icon) {
    icon = <AntdIcon type={icon} />;
  }

  return {
    name,
    key,
    path: `/${key}`,
    icon,
    routes,
  };
}

const MainLayout = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);

  const { loggedIn, user, logout } = useContext(SystemContext);

  useEffect(() => {
    if (loggedIn == 0) return;
    if (loggedIn === 2) navigate("/login");
  }, [loggedIn]);

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigate(`/personal`);
    } else if (e.key === "2") {
      showConfirm({ onOk: logout });
    }
  };

  const menuProps = {
    items: menulist,
    onClick: handleMenuClick,
  };

  const defaultProps = {
    title: "",
    logo: <img src={logoEn} style={{ height: "45px" }} />,
    fixedHeader: true,
    fixSiderbar: true,
    innerWidth: "200px",
    layout: "mix",
    route: {
      routes: menus,
    },
  };

  return (
    <>
      <ProLayout
        {...defaultProps}
        // token={{
        //   sider: {
        //     colorMenuBackground: "white",
        //   },
        // }}
        onMenuHeaderClick={() => navigate("/")}
        siderWidth={300}
        menuItemRender={(item, dom) => (
          <a
            onClick={(e) => {
              e.preventDefault();
              item.path && navigate(item.path);
            }}
            href={item.path}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          icon: <UserOutlined />,
          size: "small",
          shape: "square",
          // title: `${user.username}`,
          render: (_, dom) => {
            return <Dropdown menu={menuProps}>{dom}</Dropdown>;
          },
        }}
      >
        <Outlet />
      </ProLayout>
    </>
  );
};

export default MainLayout;
