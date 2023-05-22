// import React from "react";
// import {
//   HomeOutlined,
//   SettingOutlined,
//   UnorderedListOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Menu } from "antd";
// import { useNavigate } from "react-router-dom";

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key?: React.Key | null,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: "group"
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   } as MenuItem;
// }

// const App: React.FC = () => {
//   const navigate = useNavigate();
//   const [current, setCurrent] = React.useState<string>("home");

//   const items: MenuItem[] = [
//     getItem("Trang chủ", "/", <HomeOutlined />
//       //   getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
//       //   getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
//     ),

//     getItem("Quản lý", "list", <UnorderedListOutlined />, [
//       getItem("Categories", "categories"),
//       getItem("Suppliers", "suppliers"),
//       getItem("Customers", "customers"),
//       getItem("Employees", "employees"),
//     ]),

//     getItem("Quản lý Orders", "", <SettingOutlined />, [
//       getItem("Orders", "orders"),
//       getItem("OrderDetails", "orderDetails"),
//     ]),
//   ];

//   const onClick: MenuProps["onClick"] = (e) => {
//     setCurrent(e.key?.toString() || "home");
//     navigate(e.key?.toString() || "home");
//   };

//   return (
//     <Menu
//       onClick={onClick}
//       style={{ width: 256 }}
//       mode="vertical"
//       items={items}
//       selectedKeys={[current]}
//     />
//   );
// };

// export default App;
import React from "react";
import { Layout, Menu } from "antd";
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
import CreateProduct from "../../pages/Products/create";
import CreateCategory from "../../pages/Categories/create";
import CreateCustomer from "../../pages/Customers/create";
import CreateSupplier from "../../pages/Suppliers/create";
import CreateEmployee from "../../pages/Employees/create";

const { Header, Content, Sider } = Layout;
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

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState<string>("home");

  const handleMenuClick = (e: { key: string }) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo"/>
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
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path="/categories" element={<Categories />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/orders" element={<Orders />} />
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
};

export default NavigationBar;
