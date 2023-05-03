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
  //   const { setIsLogin } = props;
  //   const handleUpdate = () => {
  //     setIsLogin(false);
  //     navigate(`/`);
  //   };
  const [current, setCurrent] = React.useState("home");

  return (
    <div
      style={
        {
          /* display: "flex", justifyContent: "space-between" */
        }
      }
    >
      <Menu
        onClick={(e) => {
          setCurrent(e.key);
          navigate(e.key);
        }}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {/* <Button onClick={handleUpdate} type="primary">
        Đăng xuất
      </Button> */}
    </div>
  );
}

export default NavigationBar;
