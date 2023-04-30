import { Button, Card } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
import Styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

import numeral from "numeral";
import { useLocation } from "react-router-dom";

const apiName = "/products";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const productDetail = location.state.productDetail;

  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios
      .get(`${apiName}?description=${productDetail}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: 24, display: "flex" }}>
      <div style={{ marginLeft: "24px", flex: "1", display: "flex" }}>
        {products.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            bordered={false}
            style={{ width: 300, margin: "12px" }}
            hoverable
          >
            <img
              alt=""
              style={{ width: "100%", height: "100px" }}
              src={item.img}
            />
            <div style={{ display: "flex" }}>
              <strong>{item.description}</strong>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <strong>Giá : </strong>
              <span>{numeral(item.price).format("0,0")}</span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <strong>Giảm giá : </strong>
              <span>{numeral(item.discount).format("0,0")}%</span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <strong>Tồn kho : </strong>
              <span>{numeral(item.stock).format("0,0")}</span>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                className={Styles.but}
                onClick={() => {
                  navigate("/carts");
                }}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                style={{
                  backgroundColor: "#ff3300",
                  margin: "10px 10px 5px 5px",
                }}
              >
                Mua ngay
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
