import React, { memo } from "react";
import { Input, message, Select } from "antd";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import styles from "./order.module.css";

import axios from "../../libraries/axiosClient";

function Order() {
  const router = useRouter();
  const [carts, setCarts] = React.useState([]);
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("CASH");
  const [description, setDescription] = React.useState("");

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

  const handleAddOrder = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const customerId = decoded._id;
    console.log("customerId", customerId);

    const orderDetails = carts[0].products.map((p) => {
      return {
        productId: p.product._id,
        quantity: p.quantity,
        price: p.product.price - (p.product.price * p.product.discount) / 100,
        discount: p.product.discount,
      };
    });

    const createDate = new Date();
    const shippedDate = new Date(createDate);
    shippedDate.setDate(createDate.getDate() + 3);

    const order = {
      createdDate: new Date(),
      shippedDate: shippedDate,
      paymentType: paymentType,
      shippingAddress: shippingAddress,
      status: "WAITING",
      description: description,
      customerId: customerId,
      employeeId: null,
      orderDetails: orderDetails,
    };

    try {
      const response = await axios.post("/orders", order);

      if (response) {
        message.success("Đặt hàng thành công!", 1.5);
        await axios.delete(`/carts/${customerId}`);
        window.location.href = "/checkout";
      }
    } catch (error) {
      message.error("Vui lòng nhập địa chỉ!", 1.5);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>Thanh Toán</h1>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Nhập địa chỉ giao hàng"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <div className={styles.column_title}>
          <div className={styles.product_image}>Hình Ảnh</div>
          <div className={styles.product_details}>Sản Phẩm</div>
          <div className={styles.product_price}>Giá Tiền</div>
          <div className={styles.product_discount}>Giảm Giá</div>
          <div className={styles.product_quantity}>Số Lượng</div>
          <div className={styles.product_line_price}>Thành Tiền</div>
        </div>
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
                      (product.product.price * product.product.discount * 1) /
                        100);
                  return (
                    <div class={styles.product} key={product.productId}>
                      <div className={styles.product_image}>
                        <img
                          alt=""
                          src={product.product.img}
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className={styles.product_details}>
                        <div className="product_title">
                          {product.product.name}
                        </div>
                      </div>
                      <div className={styles.product_price}>
                        {numeral(product.product.price).format("0,0")}đ
                      </div>
                      <div className={styles.product_discount}>
                        {numeral(product.product.discount).format("0,0")}%
                      </div>
                      <div class={styles.product_quantity}>
                        <input
                          type="number"
                          value={product.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.product._id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>

                      <div class={styles.product_line_price}>
                        {numeral(
                          product.quantity *
                            (product.product.price -
                              (product.product.price *
                                product.product.discount *
                                1) /
                                100)
                        ).format("0,0")}{" "}
                        đ
                      </div>
                    </div>
                  );
                })}
                <Input
                  className={styles.chat}
                  style={{ marginTop: "10px" }}
                  placeholder="Lời nhắn cho người bán"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.totals}>
                  <div className={styles.totals_item}>
                    <div className={styles.totals_title}>Tổng Tiền</div>
                    <div className={styles.totals_value}>
                      đ{numeral(totalPrice).format("0,0")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className={styles.payment}>
          Quý khách vui lòng thanh toán khi nhận hàng
        </div>

        <button className={styles.checkout} onClick={() => handleAddOrder()}>
          Đặt hàng
        </button>
      </div>
    </>
  );
}
export default memo(Order);
