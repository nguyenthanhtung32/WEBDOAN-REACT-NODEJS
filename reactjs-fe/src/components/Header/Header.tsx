import {
  ShoppingCartOutlined,
  FacebookOutlined,
  InstagramOutlined,
  DownloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import axios from "../../libraries/axiosClient";
import { Link } from "react-router-dom";
import Styles from "./Header.module.css";
import { Button, Input, message } from "antd";
import { useCallback } from "react";
import React from "react";

const apiName = "/products";

const initialState = {
  productName: "",
};

export default function Header() {
  const [showButton, setShowButton] = React.useState(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<any>(initialState);
  const [categories, setCategories] = React.useState<any[]>([]);

  const onChangeFilter = useCallback((e: any) => {
    setFilter((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const callApi = useCallback((searchParams: any) => {
    axios
      .get(`${apiName}?${searchParams}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const onSearch = useCallback(() => {
    const checkInputData = (input: any, name: any) => {
      if ((input && isNaN(input)) || (input && input < 0)) {
        message.error(`Dữ liệu nhập vào ô ${name} không hợp lệ!`);

        return true;
      }

      return false;
    };
    // Kiểm tra dữ liệu nhập vào từng ô tìm kiếm
    const isInvalidData =
      checkInputData(filter.stockStart, "Tồn kho") ||
      checkInputData(filter.stockEnd, "Tồn kho") ||
      checkInputData(filter.priceStart, "Giá bán") ||
      checkInputData(filter.priceEnd, "Giá bán") ||
      checkInputData(filter.discountStart, "Giảm giá") ||
      checkInputData(filter.discountEnd, "Giảm giá");

    if (isInvalidData) return;
    // Lọc các trường có giá trị để tạo query params
    const filterFields = Object.keys(filter).filter(
      (key) => filter[key] !== undefined && filter[key] !== ""
    );

    // Tạo query params từ các trường đã lọc
    const searchParams = new URLSearchParams(
      filterFields.map((key) => {
        return [key, filter[key]];
      })
    );

    // Gọi API với các query params đã tạo
    callApi(searchParams);
  }, [callApi, filter]);
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
  React.useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const { data } = response;
        setCategories([data.payload]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
            <Link to="https://www.facebook.com/profile.php?id=100044424131873&mibextid=ZbWKwL">
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
            <Link to="/">
              <img
                className={Styles.logo}
                src="https://storage.googleapis.com/ops-shopee-files-live/live/affiliate-blog/2019/05/logo-full-white.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className={Styles.search_container}>
            <Input
              className={Styles.search_box}
              placeholder="Tìm kiếm sản phẩm"
              name="productName"
              value={filter.productName}
              onChange={onChangeFilter}
              allowClear
            />

            <Button className={Styles.search_button} onClick={onSearch}>
              <SearchOutlined />
            </Button>
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
