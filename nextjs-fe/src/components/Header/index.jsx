import Link from "next/link";
import Styles from "./header.module.css";
import { Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onSearch = (name) => {
    router.push({
      pathname: "/products",
      query: { ProductName: name },
    });
  };

  return (
    <header className={Styles.header_container}>
      <div className={Styles.left_nav_links}>
        <div>
          <Link href="/home">
            <img
              className={Styles.logo}
              src="https://www.milanoplatinum.com/wp-content/uploads/2015/11/THE-MALL_logo_MilanoPlatinum.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className={Styles.search_container}>
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
            className={Styles.search_box}
          />
          <button className={Styles.search_button} onClick={onSearch}>
            <SearchOutlined />
          </button>
        </div>
      </div>
      <div className={Styles.right_nav_links}>
        <div>
          <div className={Styles.cart_container}>
            <Link href="/cart">
              <ShoppingCartOutlined className={Styles.cart_icon} />
            </Link>
          </div>
          <div className={Styles.authentication_links}>
            <Link href="/login" className={Styles.link}>
              Đăng nhập
            </Link>
            <Link href="/register" className={Styles.link}>
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
