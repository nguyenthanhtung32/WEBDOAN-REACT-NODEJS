import React from "react";
import { Button, Layout, Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import Categories from "../../pages/Categories";
import Suppliers from "../../pages/Suppliers";
import Products from "../../pages/Products";
import Customers from "../../pages/Customers";
import Employees from "../../pages/Employees";
import Orders from "../../pages/Orders";
import OrdersDetail from "../../pages/Orders/detail";
import CreateProduct from "../../pages/Products/create";
import CreateCategory from "../../pages/Categories/create";
import CreateCustomer from "../../pages/Customers/create";
import CreateSupplier from "../../pages/Suppliers/create";
import CreateEmployee from "../../pages/Employees/create";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const menuItems = [
  {
    key: "products",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "list",
    icon: <UnorderedListOutlined />,
    label: "Quản lý",
    children: [
      { key: "categories", label: "Categories" },
      { key: "suppliers", label: "Suppliers" },
      { key: "products", label: "Products" },
      { key: "customers", label: "Customers" },
      { key: "employees", label: "Employees" },
    ],
  },
  {
    key: "orders",
    icon: <SettingOutlined />,
    label: "Quản lý Orders",
    children: [
      { key: "orders", label: "Orders" },
      { key: "orderDetails", label: "OrderDetails" },
    ],
  },
];

interface IProps {
  setIsLogin: (value: boolean) => void;
}

export default function NavigationBar(props: IProps) {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState<string>("home");
  const { setIsLogin } = props;

  const handleMenuClick = (e: { key: string }) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  const handleUpdate = () => {
    setIsLogin(false);
    navigate(`/`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" />
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          selectedKeys={[current]}
        >
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "10px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Button className="logout-button" onClick={handleUpdate}>
              Đăng xuất
            </Button>
            <Routes>
              <Route path="/categories" element={<Categories />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orderDetails" element={<OrdersDetail />} />
            </Routes>
            <Routes>
              <Route path="/category" element={<CreateCategory />} />
              <Route path="/product" element={<CreateProduct />} />
              <Route path="/customer" element={<CreateCustomer />} />
              <Route path="/supplier" element={<CreateSupplier />} />
              <Route path="/employee" element={<CreateEmployee />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
