import {
  HomeOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";

import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },

  {
    label: "List",
    key: "list",
    icon: <UnorderedListOutlined />,
    children: [
      {
        label: "Categories",
        key: "categories",
      },
      {
        label: "Suppliers",
        key: "suppliers",
      },
      {
        label: "Products",
        key: "products",
      },
      {
        label: "Customers",
        key: "customers",
      },
      {
        label: "Employees",
        key: "employees",
      },
    ],
  },
  {
    label: "Orders",
    key: "orders",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "Cart",
    key: "Cart",
    icon: <ShoppingCartOutlined />,
  },
];

export default function NavigationBar() {
  const navigate = useNavigate();

  const [current, setCurrent] = React.useState("home");

  return (
    <Menu
      theme="dark"
      onClick={(e) => {
        console.log(e);
        setCurrent(e.key);
        navigate(e.key);
      }}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
