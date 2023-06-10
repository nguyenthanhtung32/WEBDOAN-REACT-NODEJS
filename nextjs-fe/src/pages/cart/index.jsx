import React from "react";
import { Button, Badge, Card, Col, Input, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import numeral from "numeral";

import axios from "../../libraries/axiosClient";

export default function Cart() {
  const [carts, setCarts] = React.useState([]);

  // Load cart on page load
  // React.useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const response = await axios.get(`/carts`);

  //       const data = response.data || [];

  //       setCarts(data.results);

  //       console.log("data", data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCart();
  // }, []);
  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const customerId = "646baa5337ebafb3e60e689e";
        const response = await axios.get(`/carts/${customerId}`);

        const data = response.data;

        setCarts(data.payload.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);

  // Handle quantity change
  const handleQuantityChange = async (id, size, quantity) => {
    try {
      const response = await axios.put(`/carts/${id}`, { size, quantity });
      const updatedCart = response.data;
      const newCarts = carts.map((cart) =>
        cart._id === updatedCart._id ? updatedCart : cart
      );
      setCarts(newCarts);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle remove cart
  const handleRemoveCart = async (id) => {
    try {
      await axios.delete(`/carts/${id}`);
      const newCarts = carts.filter((cart) => cart._id !== id);
      setCarts(newCarts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Col span={16}>
          <Card title="Giỏ hàng">
            <div>
              {carts.length > 0 &&
                carts.map((cart) => (
                  <Row className="cart-item" key={cart._id}>
                    <Col span={16} className="cart-item-info">
                      <div>
                        <p>{carts.customerId}</p>
                      </div>
                      {cart?.products?.map((product) => (
                        <div className="cart-item-quantity">
                          <img
                            alt=""
                            src={carts.product.img}
                            width="50px"
                            height="50px"
                          />
                          <Input
                            type="number"
                            value={carts.quantity}
                            min={1}
                            max={10}
                            onChange={(e) =>
                              handleQuantityChange(
                                product._id,
                                parseInt(e.target.value)
                              )
                            }
                            style={{ marginRight: "10px" }}
                          />
                          <Badge
                            count={
                              <DeleteOutlined
                                style={{ color: "#f5222d" }}
                                onClick={() => handleRemoveCart(product._id)}
                              />
                            }
                          />
                        </div>
                      ))}
                    </Col>
                  </Row>
                ))}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Thông tin giỏ hàng">
            {carts.length > 0 &&
              carts.map((cart) => (
                <div key={cart._id}>
                  <p>{cart.name}</p>
                  <p>
                    Số lượng: {cart.quantity}
                    <p style={{ fontWeight: "bold" }}>
                      Giá:
                      {numeral(cart.quantity * cart.price).format("0,0")}₫
                    </p>
                  </p>
                  <hr />
                </div>
              ))}
            <Button className="checkout-button">Đặt hàng</Button>
          </Card>
        </Col>
      </div>
    </div>
  );
}
