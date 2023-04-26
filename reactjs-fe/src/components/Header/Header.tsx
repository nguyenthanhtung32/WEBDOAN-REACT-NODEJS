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