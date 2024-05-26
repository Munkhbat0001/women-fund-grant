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
import { useAxios } from "../../hooks";
import { ADMIN_MENU } from "../../utils/operation";

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

  useEffect(() => {
    const fetchMenu = () =>
      useAxios(ADMIN_MENU).then((res) => {
        const menus2 = res
          .filter((x) => x.routeName)
          .map((item) =>
            getItem(
              item.menuName,
              item.routeName,
              item.icon,
              item.children.length > 0
                ? item.children
                    .filter((x) => x.routeName)
                    .map((child) =>
                      getItem(child.menuName, child.routeName, child.icon)
                    )
                : undefined
            )
          );
        setMenus(menus2);
        const url = window.location.pathname.replaceAll("/", "");
        if (!url) {
          const list = orderBy(res, ["orderNo"], ["asc"]);
          if (list[0].children.length > 0) {
            navigate(
              `/${list[0].children.filter((x) => x.routeName)[0].routeName}`
            );
          } else {
            navigate(`/${list[0].routeName}`);
          }
        }
      });
    Promise.all([fetchMenu()]);
  }, []);

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigate(`/profile`);
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
        token={{
          sider: {
            colorMenuBackground: "white",
          },
        }}
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
          title: `${user.firstName}`,
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
