import {
  HomeOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";

import { useNavigate } from "react-router-dom";

interface IProps {
  setIsLogin: (value: boolean) => void;
}

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

function NavigationBar(props: IProps) {
  const navigate = useNavigate();
<<<<<<<< HEAD:reactjs-fe/src/components/Navigation/NavigationBar.tsx
  const { setIsLogin } = props;
  const handleUpdate = () => {
    setIsLogin(false);
    navigate(`/`);
  };
  const [current, setCurrent] = React.useState("home");

  return (
    <>
      <Menu
        onClick={(e) => {
          console.log(e);
========
//   const { setIsLogin } = props;
//   const handleUpdate = () => {
//     setIsLogin(false);
//     navigate(`/`);
//   };
  const [current, setCurrent] = React.useState("home");

  return (
    <div style={{ /* display: "flex", justifyContent: "space-between" */ }}>
      <Menu
        onClick={(e) => {
>>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9:reactjs-fe/src/components/NavigationBar/NavigationBar.tsx
          setCurrent(e.key);
          navigate(e.key);
        }}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
<<<<<<<< HEAD:reactjs-fe/src/components/Navigation/NavigationBar.tsx
      <button onClick={handleUpdate} className="btn btn-outline-success">
        Đăng xuất
      </button>
    </>
========
      {/* <Button onClick={handleUpdate} type="primary">
        Đăng xuất
      </Button> */}
    </div>
>>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9:reactjs-fe/src/components/NavigationBar/NavigationBar.tsx
  );
}

export default NavigationBar;
