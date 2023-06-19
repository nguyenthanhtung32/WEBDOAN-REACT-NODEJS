import React, { memo } from "react";
import { Button, Badge, Card, Col, Input, Row, message, Result } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import styles from "./cart.module.css";

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
        message.success("Xóa sản phẩm thành công!", 1.5);
      } catch (error) {
        console.log(error);
        message.success("Xóa sản phẩm thất bại!", 1.5);
      }
    }
  };

  const handleAddOrder = async () => {
    router.push({
      pathname: "/order",
    });
  };

  return (
    <div className={styles.container}>
      <Col span={13} className={styles.left}>
        <Card title="Giỏ hàng">
          <div>
            {carts.length > 0 &&
              carts.map((cart) => (
                <Row key={cart._id}>
                  <Col className={styles.col}>
                    {cart.products.length > 0 ? (
                      cart.products.map((product) => (
                        <>
                          {" "}
                          <div
                            className={styles.cart_item_info}
                            key={product.productId}
                          >
                            <div>
                              <img
                                alt=""
                                src={product.product.img}
                                width="100px"
                                height="100px"
                              />
                            </div>

                            <div>
                              <p className={styles.product_name}>
                                {product.product.name}
                              </p>
                            </div>

                            <div>
                              <Input
                                className={styles.quantity}
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
                            </div>

                            <div>
                              <p className={styles.price}>
                                {numeral(product.product.price).format("0,0")}
                              </p>
                            </div>
                            <div>
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                  handleRemoveCart(product.product._id)
                                }
                              />
                            </div>
                          </div>
                          <p className={styles.line}> </p>
                        </>
                      ))
                    ) : (
                      <Result
                        title="There are no products in your cart yet"
                        extra={
                          <Button
                            type="submit"
                            style={{
                              backgroundColor: "#1C86EE",
                              color: "#fff",
                            }}
                            key="console"
                          >
                            <Link href="/products">Keep Shopping</Link>
                          </Button>
                        }
                      />
                    )}
                  </Col>
                </Row>
              ))}
          </div>
        </Card>
      </Col>
      <Col span={6} className={styles.right}>
        <Card title="Thông tin giỏ hàng">
          {carts.length > 0 &&
            carts.map((cart) => {
              let totalPrice = 0; // khởi tạo biến totalPrice bằng 0
              return (
                <div key={cart._id}>
                  {cart.products.map((product) => {
                    // tính giá tiền của từng sản phẩm và cộng dồn vào biến totalPrice
                    totalPrice +=
                      product.quantity *
                      (product.product.price -
                        (product.product.price * product.product.discount * 1) /
                          100);
                    return (
                      <>
                        <div
                          key={product.productId}
                          className={styles.cart_info}
                        >
                          <img
                            alt=""
                            src={product.product.img}
                            width="100px"
                            height="100px"
                          />
                          <p>{product.product.name}</p>
                          <p>Số lượng: {product.quantity}</p>
                          <p>
                            Giá gốc:{" "}
                            {numeral(
                              product.quantity * product.product.price
                            ).format("0,0")}
                            ₫
                          </p>
                          <p>Discount: {product.product.discount}%</p>
                          <p style={{ fontWeight: "bold" }}>
                            Giá:{" "}
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
                      </>
                    );
                  })}
                  <p className={styles.total}>
                    Tổng giá: {numeral(totalPrice).format("0,0")}₫
                  </p>
                </div>
              );
            })}
          <Button
            className={styles.checkout_button}
            onClick={() => handleAddOrder()}
          >
            Đặt hàng
          </Button>
        </Card>
      </Col>
    </div>
  );
}

export default memo(Cart);
