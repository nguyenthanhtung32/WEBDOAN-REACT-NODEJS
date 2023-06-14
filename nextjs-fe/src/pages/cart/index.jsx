import React, { memo } from "react";
import { Button, Badge, Card, Col, Input, Row, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import axios from "../../libraries/axiosClient";

function Cart() {
  const router = useRouter();
  const [carts, setCarts] = React.useState([]);

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        const response = await axios.get(`/carts/${customerId}`);

        const data = response.data;

        setCarts(data.payload.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [router]);

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

  const handleRemoveCart = async (productId) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      try {
        const newCarts = [...carts];
        const cartIndex = newCarts.findIndex((cart) =>
          cart.products.some((product) => product.productId === productId)
        );
        const productIndex = newCarts[cartIndex].products.findIndex(
          (product) => product.productId === productId
        );

        newCarts[cartIndex].products.splice(productIndex, 1);

        setCarts(newCarts);
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        await axios.delete(`/carts/${customerId}/${productId}`);
        message.success("xóa thành công!", 1.5);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Col span={16}>
          <Card title="Giỏ hàng">
            <div>
              {carts?.length > 0 &&
                carts.map((cart) => (
                  <Row className="cart-item" key={cart._id}>
                    <Col span={16} className="cart-item-info">
                      {cart?.products?.map((product) => (
                        <div
                          className="cart-item-quantity d-flex"
                          key={product.productId}
                        >
                          <img
                            alt=""
                            src={product.product.img}
                            width="50px"
                            height="50px"
                          />
                          <p>{product.product.name}</p>
                          <Input
                            type="number"
                            value={product.quantity}
                            min={1}
                            max={10}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.product._id,
                                parseInt(e.target.value)
                              )
                            }
                            style={{ marginRight: "10px" }}
                          />
                          <p>{product.product.price}</p>
                          <Badge
                            count={
                              <DeleteOutlined
                                style={{ color: "#f5222d" }}
                                onClick={() =>
                                  handleRemoveCart(product.product._id)
                                }
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
              carts.map((cart) => {
                let totalPrice = 0; // khởi tạo biến totalPrice bằng 0
                return (
                  <div key={cart._id}>
                    {cart?.products?.map((product) => {
                      // tính giá tiền của từng sản phẩm và cộng dồn vào biến totalPrice
                      totalPrice +=
                        product.quantity *
                        (product.product.price -
                          (product.product.price *
                            product.product.discount *
                            1) /
                            100);
                      return (
                        <div key={product.productId}>
                          <img
                            alt=""
                            src={product.product.img}
                            width="50px"
                            height="50px"
                          />
                          <p>{product.product.name}</p>
                          <p>Số lượng: {product.quantity}</p>
                          <p>
                            Giá gốc :{" "}
                            {numeral(
                              product.quantity * product.product.price
                            ).format("0,0")}
                            ₫
                          </p>
                          <p>Discount : {product.product.discount}%</p>
                          <p style={{ fontWeight: "bold" }}>
                            Giá:
                            {numeral(
                              product.quantity *
                                (product.product.price -
                                  (product.product.price *
                                    product.product.discount *
                                    1) /
                                    100)
                            ).format("0,0")}
                            ₫
                          </p>
                        </div>
                      );
                    })}
                    <p style={{ fontWeight: "bold" }}>
                      Tổng giá: {numeral(totalPrice).format("0,0")}₫
                    </p>
                  </div>
                );
              })}
            <Button className="checkout-button">Đặt hàng</Button>
          </Card>
        </Col>
      </div>
    </div>
  );
}

export default memo(Cart);
