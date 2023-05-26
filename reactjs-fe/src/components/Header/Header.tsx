import React from "react";
import Styles from "./Header.module.css";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

interface IProps {
  setIsLogin: (value: boolean) => void;
}

export default function Header(props: IProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLogin } = props;
  const handleLogout = () => {
    setIsLogin(false);
    navigate(`/`);
  };

  const onSearch = () => {
    navigate("/renderCategory", {
      state: {
        nameCategory: searchValue,
      },
    });
  };

  React.useEffect(() => {
    setSearchValue("");
  }, [location.pathname]);

  return (
    <>
      <header className={Styles.header_container}>
        <div className={Styles.bottom_nav_links}>
          <div className={Styles.search_container}>
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={Styles.search_box}
            />
            <button className={Styles.search_button} onClick={onSearch}>
              <SearchOutlined />
            </button>
          </div>
          <Button className={Styles.button} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
    </>
  );
}
