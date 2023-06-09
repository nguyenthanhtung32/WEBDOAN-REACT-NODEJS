<<<<<<< HEAD
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  InstagramOutlined,
  DownloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Styles from "./Header.module.css";
import { Button } from "antd";
import { useCallback } from "react";
import React from "react";

export default function Header() {
  const [showButton, setShowButton] = React.useState(false);

  const handleMoveTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleScroll = useCallback(() => {
    const threshold = window.innerHeight / 2;
    setShowButton(window.pageYOffset > threshold);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <header className={Styles.header_container}>
        <div className={Styles.top_nav_links}>
          <div className={Styles.social_links}>
            <Link to="/" className={Styles.icon_download}>
              <DownloadOutlined />
              <img
                src="https://static.vecteezy.com/system/resources/previews/002/520/836/original/download-apps-button-google-play-and-app-store-vector.jpg"
                alt="Download"
                className={Styles.img_download}
              />
            </Link>
            <Link to="/">
              <FacebookOutlined />
            </Link>
            <Link to="/">
              <InstagramOutlined />
            </Link>
          </div>
          <div>
            <Link to="/products" className={Styles.link}>
              Sản phẩm
            </Link>
            <Link to="/login" className={Styles.link}>
              Đăng nhập
            </Link>
            <Link to="/signup" className={Styles.link}>
              Đăng ký
            </Link>
          </div>
        </div>
        <div className={Styles.bottom_nav_links}>
          <div>
            <Link to="/home">
              <img
                className={Styles.logo}
                src="https://storage.googleapis.com/ops-shopee-files-live/live/affiliate-blog/2019/05/logo-full-white.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className={Styles.search_container}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className={Styles.search_box}
            />
            <button className={Styles.search_button}>
              <SearchOutlined />
            </button>
          </div>
          <div className={Styles.cart_container}>
            <Link to="/cart">
              <ShoppingCartOutlined className={Styles.cart_icon} />
            </Link>
          </div>
        </div>
      </header>
      <div className={Styles.move_top_wrapper}>
        <Button
          onClick={handleMoveTop}
          style={{
            opacity: showButton ? 1 : 0,
            pointerEvents: showButton ? "auto" : "none",
          }}
        >
          <UpOutlined />
        </Button>
      </div>
    </>
  );
}
=======
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={Styles.header_container}>
      <Link to="/home">
        <img
          className={Styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
          alt="Logo"
        />
      </Link>
      <div className={Styles.nav_links}>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          <ShoppingCartOutlined />{" "}
        </Link>
        <Link to="/login">Login</Link>
        <span>|</span>
        <Link to="/signup">Sign up</Link>
      </div>
    </header>
  );
}
>>>>>>> 1f6ce0cb26f1e1a0eb8344fbfd6d251cf605c1c9
