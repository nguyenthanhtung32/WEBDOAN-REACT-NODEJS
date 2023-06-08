import React, { useState, memo } from "react";
import Link from "next/link";
import styles from "./header.module.css";
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
    <header className={styles.header_container}>
      <div className={styles.left_nav_links}>
        <div>
          <Link href="/">
            <img
              className={styles.logo}
              src="https://www.milanoplatinum.com/wp-content/uploads/2015/11/THE-MALL_logo_MilanoPlatinum.png"
              alt="Logo"
            />
          </Link>
          <Link href="/" className={styles.home}>
            Trang chủ
          </Link>
          <Link href="/search-products" className={styles.home}>
            Sản phẩm
          </Link>
          {/* <Link href="/footer" className={styles.home}>Liên hệ</Link> */}
        </div>
      </div>
      <div className={styles.right_nav_links}>
        <div>
          <div className={styles.search}>
            <Link href="/search-products">
              <SearchOutlined />
            </Link>
          </div>
          <div className={styles.cart_container}>
            <Link href="/cart">
              <ShoppingCartOutlined className={styles.cart_icon} />
            </Link>
          </div>
          <div className={styles.authentication_links}>
            <Link href="/login" className={styles.link}>
              <UserOutlined />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
