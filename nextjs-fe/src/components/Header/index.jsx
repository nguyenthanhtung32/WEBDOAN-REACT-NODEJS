import React, { useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./header.module.css";
import axios from "../../libraries/axiosClient";

function Header() {
  const [customerId, setCustomerId] = useState(null);
  const [carts, setCarts] = useState([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;
        const response = await axios.get(`/carts/${customerId}`);
        console.log("response", response);

        const data = response.data;

        setCarts(data.payload.results);
        setCustomerId(customerId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [router?.query?.customerId]);

  const handleCartClick = () => {
    router.push({
      pathname: "/cart",
    //   query: { customerId: customerId },
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
          <Link href="/" className={styles.home}>Trang chủ</Link>
          <Link href="/search-products" className={styles.home}>Sản phẩm</Link>
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
          <div className={styles.cart_container} onClick={handleCartClick}>
            <ShoppingCartOutlined className={styles.cart_icon} />
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
