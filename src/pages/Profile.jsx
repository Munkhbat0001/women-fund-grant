import { Menu, Tabs, Layout, theme } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  UserOutlined,
  LockOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Information from "../components/profile/Information";
import HistoryGrantList from "../components/profile/HistoryGrantList";
import ActiveGrantList from "../components/profile/ActiveGrantList";
import ChangePassword from "../components/profile/ChangePassword";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Хувийн мэдээлэл",
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Тэтгэлэгийн түүх",
  },
  {
    key: "3",
    icon: <ProfileOutlined />,
    label: "Идэвхитэй байгаа өргөдөл",
  },
  {
    key: "4",
    icon: <LockOutlined />,
    label: "Нууц үг",
  },
];

const Profile = () => {
  const [current, setCurrent] = useState("1");
  const { token } = theme.useToken();

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <div className="container  pt-[100px] pb-[150px]">
        <Layout
          style={{
            // minHeight: "100vh",
            // width: 256,
            background: token.colorBgContainer,
          }}
          hasSider
        >
          <Sider
            style={{
              // background: token.colorBgContainer,
              // overflow: "auto",
              // height: "100vh",
              position: "fixed",
              // left: 256,
              // top: 75,
              // bottom: 0,
            }}
            width={256}
          >
            <Menu
              style={{ width: 256 }}
              // defaultSelectedKeys={["1"]}
              items={items}
              onClick={onClick}
              selectedKeys={[current]}
              getPopupContainer={(node) => node.parentNode}
            />
          </Sider>
          <Layout
            style={{
              marginLeft: 256,
            }}
          >
            <Content
              style={{
                // color: token.colorTextTertiary,
                backgroundColor: token.colorFillAlter,
                // borderRadius: token.borderRadiusLG,
                // border: `1px solid ${token.colorBorder}`,
                padding: 16,
                borderRadius: token.borderRadiusLG,
              }}
            >
              {current == "1" && <Information />}
              {current == "2" && <HistoryGrantList />}
              {current == "3" && <ActiveGrantList />}
              {current == "4" && <ChangePassword />}
            </Content>
          </Layout>
        </Layout>

        {/* {menu === 1 && <Information />} */}
      </div>
    </>
  );
};

export default Profile;
