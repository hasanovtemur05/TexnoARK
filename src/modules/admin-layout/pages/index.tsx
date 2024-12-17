import { useState, useEffect, } from "react";
import {
  useNavigate,
  Outlet,
  useLocation,
  NavLink,
 
} from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Dropdown, message, theme } from "antd";
import admin from "../../../router/routs";

const Index = () => {
  const { Header, Sider, Content } = Layout;
  const [selectedKeys, setSelectedKeys] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const index = admin.findIndex((item) => item.path === pathname);
    if (index !== -1) {
      setSelectedKeys(index.toString());
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    message.success("Logged out successfully");
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout className="h-[100vh] overflow-hidden">
      <Sider
        collapsedWidth={65}
        style={{ height: "100vh" }}
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {collapsed ? (
          <div
            onClick={() => navigate("/")}
            className="demo-logo-vertical cursor-pointer h-[60px] my-2 flex items-center mx-3"
          >
            <img
              src={logo}
              alt="logo"
              className="w-[40px]"
            />
          </div>
        ) : (
          <div
            onClick={() => navigate("/admin-layout")}
            className="demo-logo-vertical cursor-pointer mx-3 my-2 h-[60px] flex items-center gap-3"
          >
            <img
              src={logo}
              alt="logo"
              className="w-[40px]"
            />
            <span className="text-[20px] text-[#fff]">TechnoArk</span>
          </div>
        )}
      <Menu theme="dark" selectedKeys={[selectedKeys]}>
          {admin.map((item, index) => (
            <Menu.Item
              icon={item.icon}
              key={index}
              className={item.path === pathname ? "ant-menu-items" : "" }
              
            >
              <NavLink to={item.path} key={index}>
                <span className="text-[18px]">{item.content}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
        <Layout className="overflow-auto">
          <Header
            style={{
              padding: "0px 20px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <Avatar style={{ marginRight: "16px" }} icon={<UserOutlined />} />
            </Dropdown>
          </Header>
          <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Index;
