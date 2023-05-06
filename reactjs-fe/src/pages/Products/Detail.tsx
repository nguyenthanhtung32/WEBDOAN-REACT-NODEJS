import { Button, Card } from "antd";
import axios from "../../libraries/axiosClient";
import React from "react";
import Styles from "./index.module.css";
// import { useNavigate } from "react-router-dom";

import numeral from "numeral";
import { useLocation } from "react-router-dom";

const apiName = "/products";

export default function Products() {
  //   const navigate = useNavigate();
  const location = useLocation();
  const productDetail = location.state.productDetail;

  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!productDetail) return;

    axios
      .get(`${apiName}?description=${productDetail}`)
      .then((response) => {
        const { data } = response;

        // Lọc ra sản phẩm có description trùng với productDetail
        const filteredProducts = data.payload.filter(
          (product: any) => product.description === productDetail
        );

        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productDetail]);

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
  }, [productDetail]);

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
            <img alt="" style={{ width: "auto", height: 150 }} src={item.img} />
            <div style={{ display: "flex" }}>
              <span>{item.description}</span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <span>
                Giá: <span>{numeral(item.price).format("0,0")}</span>
              </span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <span>
                Giảm giá: <span>{numeral(item.discount).format("0,0")}%</span>
              </span>
            </div>
            <div style={{ display: "flex", color: "#ff3300" }}>
              <span>
                Tồn kho: <span>{numeral(item.stock).format("0,0")}</span>
              </span>
            </div>
            <div className={Styles.formatButton}>
              <Button className={Styles.formatButtonBuy}>Mua hàng</Button>
              <Button className={Styles.formatButtonCart}>Thêm vào giỏ hàng</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
