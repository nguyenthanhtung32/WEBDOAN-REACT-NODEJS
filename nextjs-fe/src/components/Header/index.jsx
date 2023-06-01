import React, { useState, memo } from "react";
import Link from "next/link";
import Styles from "./header.module.css";
import { Input } from "antd";
import { useRouter } from "next/router";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onSearch = (name) => {
    router.push({
      pathname: "/products",
      query: { NamePro: name },
    });
  };

  return (
    <header className={Styles.header_container}>
      <div className={Styles.left_nav_links}>
        <div>
          <Link href="/">
            <img
              className={Styles.logo}
              src="https://www.milanoplatinum.com/wp-content/uploads/2015/11/THE-MALL_logo_MilanoPlatinum.png"
              alt="Logo"
            />
          </Link>
          <Link href="/" className={Styles.home}>Trang chủ</Link>
          <Link href="/all-products" className={Styles.home}>Sản phẩm</Link>
          <Link href="#" className={Styles.home}>Liên hệ</Link>
        </div>
      </div>
      <div className={Styles.right_nav_links}>
        <div>
          <div className={Styles.search}>
            <Link href="/all-products">
              <SearchOutlined />
            </Link>
          </div>
          <div className={Styles.cart_container}>
            <Link href="/cart">
              <ShoppingCartOutlined className={Styles.cart_icon} />
            </Link>
          </div>
          <div className={Styles.authentication_links}>
            <Link href="/login" className={Styles.link}>
              <UserOutlined />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
